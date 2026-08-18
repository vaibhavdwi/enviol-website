// lib/enyKnowledge.js

import { company } from "./eny/company";
import { products } from "./eny/products";
import { applications } from "./eny/applications";
import { technical } from "./eny/technical";
import { industries } from "./eny/industries";
import { selection } from "./eny/selection";
import { enquirySchema } from "./eny/enquirySchema";
import { safety } from "./eny/safety";

/**
 * ENY Knowledge Base
 *
 * Central knowledge layer for the Enviol AI assistant.
 *
 * Individual knowledge domains are maintained separately inside:
 * /lib/eny/
 *
 * This file combines them into one structured object that can be
 * imported by the AI API route, RAG layer, or other application logic.
 */

export const enyKnowledge = {
  company,
  products,
  applications,
  technical,
  industries,
  selection,
  enquirySchema,
  safety,
};

export default enyKnowledge;