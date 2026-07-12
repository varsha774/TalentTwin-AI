const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeResumeWithAI(resumeText) {

    const response = await client.chat.completions.create({

        model: "gpt-5-mini",

        messages: [
            {
                role: "system",
                content: "You are TalentTwin AI, an expert ATS resume analyzer."
            },
            {
                role: "user",
                content: `
Analyze this resume.

Return ONLY JSON.

{
 "resumeScore":0,
 "skills":[],
 "missingSkills":[],
 "jobRoles":[
   {
    "role":"",
    "match":0
   }
 ],
 "strengths":[],
 "weaknesses":[],
 "suggestions":[],
 "learningRoadmap":[]
 }


Resume:

${resumeText}
`
            }
        ],

        temperature: 0.3
    });


    return JSON.parse(
        response.choices[0].message.content
    );
}

module.exports = analyzeResumeWithAI;