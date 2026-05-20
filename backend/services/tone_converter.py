import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from prompts.templates import PROMPTS
from dotenv import load_dotenv

load_dotenv()

class ToneConverter:
    def __init__(self):
        api_key = os.getenv("UPSTAGE_API_KEY")
        if not api_key:
            raise ValueError("UPSTAGE_API_KEY not found in environment variables")
        
        self.llm = ChatOpenAI(
            api_key=api_key,
            base_url="https://api.upstage.ai/v1/solar",
            model="solar-pro2"
        )

    async def convert(self, text: str, target_audience: str) -> str:
        system_prompt = PROMPTS.get(target_audience)
        if not system_prompt:
            raise ValueError(f"Invalid target audience: {target_audience}")

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("user", "{input}")
        ])

        chain = prompt | self.llm
        response = await chain.ainvoke({"input": text})
        
        return response.content
