from functools import lru_cache
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    api_port:int=Field(8000,alias="API_PORT")
    cors_origins:str=Field("*",alias="CORS_ORIGINS")

    class Config:
        env_file=".env"
        env_file_encoding="utf-8"


@lru_cache()
def get_settings()->Settings:
    return Settings()
