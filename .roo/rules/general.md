---
description: Guidelines general guidelines for code quality and best practices in Roo 
globs: **/*
alwaysApply: true
---
— Always use ShadCN / Tailwind CSS where applicable
— Always keep the design minimal but good looking
— Use Context7 MCP Tool to always gather latest documentation / knowledge about a library
— Use fetch MCP Tool to search / scrape from web pages and extract data

Utilize the roo-code-memory-bank-mcp server to maintain project context:

- At the start of a task or significant subtask, use check_memory_bank_status.
- If the memory bank exists (exists: true), use read_memory_bank_file for relevant files (e.g., productContext.md, activeContext.md) to load the current project context.
- Incorporate this loaded context into your planning and execution.
- When making significant decisions, progress updates, or architectural changes, use append_memory_bank_entry to record the information in the appropriate file (decisionLog.md, progress.md, etc.), ensuring context persistence.
- If the memory bank doesn't exist, consider using initialize_memory_bank if appropriate for the project.