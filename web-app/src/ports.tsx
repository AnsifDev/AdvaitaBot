'use server'

import { ChapterIndex, Quote } from "@/components/types"
import { setTimeout } from "timers/promises"

export async function makePrompt(prompt: string) {
    await setTimeout(3000)
    return `Response for the prompt: "${prompt}"`
}

import { MongoClient } from 'mongodb';

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

    const client = await MongoClient.connect(
        'mongodb+srv://advaitaAdmin:VwYhqxyxEn2qvVjV@advaitacluster.w4rvt.mongodb.net/'
    );
    const collection = client.db('Advaita').collection<Quote>('Qoutes');
    const cursor = collection.aggregate<ChapterIndex>(agg);
    const result = await cursor.toArray();
    await client.close();
    return result;
}

export async function fetchQuote(chapter: number, verse: number, withCommentary = true): Promise<Quote | null> {
    const filter = { _id: `${chapter}.${verse}` };
    const projection = {
        'commentary': withCommentary? 1: 0, 
        'translation': 1, 
        'quote': 1, 
        'chapter': 1, 
        'slogan': 1, 
        '_id': 0
    };
    const client = await MongoClient.connect(
        'mongodb+srv://advaitaAdmin:VwYhqxyxEn2qvVjV@advaitacluster.w4rvt.mongodb.net/'
    );
    const coll = client.db('Advaita').collection<Quote>('Qoutes');
    const result = await coll.findOne<Quote>(filter, { projection });
    await client.close();
    return result;
}