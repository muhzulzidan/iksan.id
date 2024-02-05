// notion.ts
import { Client } from '@notionhq/client';

const NOTION_SECRET =  process.env.NOTION_TOKEN; 
const notion = new Client({ auth: NOTION_SECRET });

export default notion;


