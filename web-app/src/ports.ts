'use server'

import { setTimeout } from "timers/promises"
import { ChatMessage, Verse } from "./types";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!)
const database = client.db('Advaita')
const quoteStore = database.collection<Verse>('Quotes2');

// export async function getChapterCount() {
//     await setTimeout(3000);

//     return 40
// }

// export async function getChapter(chapter: number, includeAllVerses = false): Promise<Chapter> {
//     console.log(`Running Chapter fetch with ${includeAllVerses}`)
//     await setTimeout(2000)

//     return {
//         _id: `${chapter}`,
//         title: 'अर्जुनविषादयोगः',
//         title_en: `The Yoga of Arjuna's Dejection`,
//         chapter_number: chapter
//     }
// }

export async function getVerse(chapter:number, verse: number): Promise<Verse | null> {
    console.log('Running Verse Fetch')
    // const data = null
    const data = await quoteStore.findOne({ _id: `${chapter}.${verse}` })

    if (data == null) return null
    return data as Verse

    // return {
    //     _id: `${chapter}.${verse}`,
    //     chapter_number: chapter,
    //     verse_number: verse,
    //     speaker: "Sri Bhagavan",
    //     verse: "श्रीभगवानुवाच —\nमय्यावेश्य मनो ये मां नित्ययुक्ता उपासते ।\nश्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥ २ ॥",
    //     commentary: "मयि विश्वरूपे परमेश्वरे आवेश्य समाधाय मनः, ये भक्ताः सन्तः, मां सर्वयोगेश्वराणाम् अधीश्वरं सर्वज्ञं विमुक्तरागादिक्लेशतिमिरदृष्टिम् , नित्ययुक्ताः अतीतानन्तराध्यायान्तोक्तश्लोकार्थन्यायेन सततयुक्ताः सन्तः उपासते श्रद्धया परया प्रकृष्टया उपेताः, ते मे मम मताः अभिप्रेताः युक्ततमाः इति । नैरन्तर्येण हि ते मच्चित्ततया अहोरात्रम् अतिवाहयन्ति । अतः युक्तं तान् प्रति युक्ततमाः इति वक्तुम् ॥ २ ॥\nकिमितरे युक्ततमाः न भवन्ति ? न ; किन्तु तान् प्रति यत् वक्तव्यम् , तत् शृणु —",
    //     verse_en: "The Blessed Lord said: Those who, fixing their minds on Me, worship Me, ever steadfast and endowed with supreme faith, are considered by Me to be the most perfect in yoga.",
    //     commentary_en: "In this verse, Lord Krishna emphasizes the importance of unwavering devotion and concentration on the Supreme Being, who is the ultimate reality and the source of all. Shankaracharya explains that the devotees who fix their minds on the Lord, recognizing Him as the all-knowing and the master of all yogis, are those who have transcended worldly attachments and ignorance. These devotees, through continuous and steadfast practice, worship the Lord with supreme faith. Such individuals are regarded by the Lord as the most perfect in yoga because they maintain a constant focus on the divine, day and night, without interruption. This uninterrupted devotion and concentration on the divine essence make them the most accomplished practitioners of yoga according to the Lord's view."
    // }
}

export async function makePrompt(question: string, history: ChatMessage[], quoteInView: string) {
    await setTimeout(3000);
    return `Response for ${question}`
}