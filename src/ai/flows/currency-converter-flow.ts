'use server';
/**
 * @fileOverview A currency conversion AI agent.
 *
 * - convertCurrency - A function that handles the currency conversion process.
 * - ConvertCurrencyInput - The input type for the convertCurrency function.
 * - ConvertCurrencyOutput - The return type for the convertCurrency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertCurrencyInputSchema = z.object({
  query: z
    .string()
    .describe('The currency to convert to, e.g. "Euros" or "Japanese Yen".'),
});
export type ConvertCurrencyInput = z.infer<typeof ConvertCurrencyInputSchema>;

const ConvertCurrencyOutputSchema = z.object({
  currencySymbol: z.string().describe('The symbol of the currency, e.g. €.'),
  currencyCode: z.string().describe('The code of the currency, e.g. EUR.'),
});
export type ConvertCurrencyOutput = z.infer<
  typeof ConvertCurrencyOutputSchema
>;

export async function convertCurrency(
  input: ConvertCurrencyInput
): Promise<ConvertCurrencyOutput> {
  return convertCurrencyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertCurrencyPrompt',
  input: {schema: ConvertCurrencyInputSchema},
  output: {schema: ConvertCurrencyOutputSchema},
  prompt: `You are a currency expert. Given the user query, identify the currency and return its symbol and code.

Query: {{{query}}}`,
});

const convertCurrencyFlow = ai.defineFlow(
  {
    name: 'convertCurrencyFlow',
    inputSchema: ConvertCurrencyInputSchema,
    outputSchema: ConvertCurrencyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
