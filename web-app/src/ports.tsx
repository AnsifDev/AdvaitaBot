'use server'

import { ChapterIndex, ChatMessage, Quote } from "@/components/types"
import { MongoClient } from 'mongodb';
import { AzureOpenAI } from "openai";

const client = new MongoClient(process.env.MONGO_DB_URI!)
const database = client.db('Advaita')
const quoteStore = database.collection<Quote>('Quotes');
// const vectorStore = database.collection<Quote>('VectorStore2')

const openaiClient = new AzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION
});

// const openaiClient = new OpenAI();

export async function getChapterIndex(): Promise<ChapterIndex[]> {
    const agg = [
        {
            '$group': {
                '_id': '$chapter', 
                'verses': {
                    '$count': {}
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ];

    const cursor = quoteStore.aggregate<ChapterIndex>(agg);
    const result = await cursor.toArray();
    return result;
}

export async function fetchQuote(chapter: number, verse: number, withCommentary = true): Promise<Quote | null> {
    const filter = { _id: `${chapter}.${verse}` };
    const projection = {
        'translation': 1, 
        'quote': 1, 
        'chapter': 1, 
        'slogan': 1, 
        '_id': 0
    };

    // console.log(projection)

    const result = await quoteStore.findOne<Quote>(filter, { projection: withCommentary? { '_id': 0 }: projection }); 
    return result;
}

// type QuestionAnalysisData = { directRef: string[], reformedQuestion: string }

// async function analyseQuestion(question: string, chat_history: ChatMessage[], quoteInView: string): Promise<QuestionAnalysisData> {
//     const response =  await openaiClient.chat.completions.create({
//         model: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME!,
//         response_format: {
//             type: 'json_object',
//         },
//         messages: [
//             { role: 'system', content: `\t- You are an information analysing bot from a question
// \t- If a question is dependent to its previous chats, then rephrase the question so that the question is independent by including required context from chat history
// \t- You are viewing the quote ${quoteInView}
// \t- If the user is not explicitly mentioned the quote in the question, then he might refering to viewing quote
// \t- From here onwards the rephrased question will be used for further processes
// \t- If ranges of quotes are mentioned in the question, expand it to quote ids in the question itself
// \t- Find all direct references of the quotes from the question (rephrased), where quotes can be represented by the following
// \t\t- quote x.y (x is chapter number and y is verse or quote number)
// \t\t- yth quote of xth chapter
// \t\t- quote y on chapter x
// \t- If ranges of quotes are identified, then split it into individuals. eg for quotes 4 to 6 in chapter 3, then ['3.4', '3.5', '3.6']
// Response Format: JSON
// Response Schema:
// {
//     directRef: [array of quote id where quote id will be just x.y in string. eg for quote 2.3, it will be '2.3'],
//     reformedQuestion: [Reformed question as string]
// }
// \t- If no directReferences are found, then empty array should be placed.` },
//             ...chat_history,
//             { role: 'user', content: question }
//         ]
//     });

//     return JSON.parse(response.choices[0].message.content!);
// }

async function askPrompt(question: string, chat_history: ChatMessage[], context: string, quoteInView: string): Promise<string> {
    const response =  await openaiClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: `\t- You are a doubt clearance chat bot, who helps to clear doubts on Bhagavat Gita Quotes based on the context provided
\t- You are viewing the quote ${quoteInView}
\t- Currently you are set to respond only for this quote based question. If others come into picture, ask user to go to the required quote, then only you will can answer that
\t- You will be provided with a context which may contains the answer for user's question
Context:\n${context}` },
            ...chat_history,
            { role: 'user', content: question }
        ]
    });

    return response.choices[0].message.content!;
}

function postfix(num: number): string {
    switch (num) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

// function arrayContains(a1: Quote[], id: string): number|null {
//     for (let index = 0; index < a1.length; index++) {
//         const element = a1[index];
        
//         if (element._id == id) return index;
//     }

//     return null;
// }

// async function rephraseQuestion(question:string, chat_history: ChatMessage[], quoteInView: string): Promise<string> {
//     const rephrasedQuestionResp = await openaiClient.chat.completions.create({
//         messages: [
//             { role: 'system', content: `You are a question rephrasing bot who will rephrase a question which may be dependent to its chat history. So rephrase the question so that all the required context for the question will be included into one. You will be viewing to the quote ${quoteInView}. If the user does't explicitly mentioned any quote, then he might refering this quote. If the question needs any quotes to satisfy its request, we need to mention that quote's id in the question` },
//             // { role: 'user', content: 'Which Quote is currently viewing' },
//             // { role: 'assistant', content: `You are currently viewing quote ${quoteInView}` },
//             ...chat_history,
//             { role: 'user', content: question }
//         ],
//         model: 'gpt-3.5-turbo'
//     });
//     return rephrasedQuestionResp.choices[0].message.content!;
// }

// async function buildContext(question: string): Promise<string> {
//     const embeddingsResp = await openaiClient.embeddings.create({
//         input: question,
//         model: 'text-embedding-ada-002'
//     });
//     const questionVectorEmbeddings = embeddingsResp.data[0].embedding!;

//     // const directQuotesCursor = quoteStore.find<Quote>({_id: { $in: analysis['directRef'] }});

//     // const [ embeddings, directQuotes ] = await Promise.all([embeddingsPromise, directQuotesCursor.toArray()]);

//     const vsPipelines = [
//         {
//             '$vectorSearch': {
//                 'index': 'default',
//                 'path': 'embeddings',
//                 'queryVector': questionVectorEmbeddings,
//                 'numCandidates': 25,
//                 'limit': 3
//             }
//         },
//         {
//             '$project': {
//                 'embeddings': 0,
//                 'tags': 0
//             }
//         }
//     ];

//     const kwsPipelines = [
//         {
//           '$search': {
//             'index': 'kwsearch', 
//             'text': {
//               'query': question, 
//               'path': 'tags'
//             }
//           }
//         }, {
//           '$limit': 2
//         },
//         {
//             '$project': {
//                 'embeddings': 0,
//                 'tags': 0
//             }
//         }
//       ];

//     const vsQuotesCursor = vectorStore.aggregate<Quote>(vsPipelines);
//     const kwsQuotesCursor = vectorStore.aggregate<Quote>(kwsPipelines);
    
//     const [vsQuotes, kwsQuotes] = await Promise.all([vsQuotesCursor.toArray(), kwsQuotesCursor.toArray()])

//     const filteredVsQuotes = vsQuotes.filter((e) => arrayContains(kwsQuotes, e._id) == null);

//     console.log('kws');
//     kwsQuotes.forEach(element => {
//         console.log(element._id);
//     });

//     console.log('vs');
//     vsQuotes.forEach(element => {
//         console.log(element._id);
//     });

//     console.log('mix');
//     [...kwsQuotes, ...filteredVsQuotes].forEach(element => {
//         console.log(element._id);
//     });

//     return [...kwsQuotes, ...filteredVsQuotes].map((e) => `This this ${e['slogan']}${postfix(e['slogan'])} quote of ${e['chapter']}${postfix(e['chapter'])} chapter or we can say quote ${e['chapter']}.${e['slogan']}\n${e['translation']}\n${'commentary' in e? `Shakaracharya commented on the quote ${e['chapter']}.${e['slogan']}`+e['commentary']: `Shankaracharya isn't commented on the quote ${e['chapter']}.${e['slogan']}`}`).join('\n')
// }

export async function makePrompt(question: string, history: ChatMessage[], quoteInView: string): Promise<string> {
    // console.log("Initializing...");
    await client.connect();

    const quote = await quoteStore.findOne<Quote>({ _id: quoteInView });
    if (quote == null) throw new Error('Database Error')
    const context = `This this ${quote['slogan']}${postfix(quote['slogan'])} quote of ${quote['chapter']}${postfix(quote['chapter'])} chapter or we can say quote ${quote['chapter']}.${quote['slogan']}\n${quote['translation']}\n${'commentary' in quote? `Shakaracharya commented on the quote ${quote['chapter']}.${quote['slogan']}`+quote['commentary']: `Shankaracharya isn't commented on the quote ${quote['chapter']}.${quote['slogan']}`}`

    console.log(context)

    return await askPrompt(question, [], context, quoteInView);
}