# Programa MES Yamaha — V2

Página executiva e interativa sobre a evolução do Programa MES Yamaha.

## Página publicada

https://andrefrateschi.github.io/mes-processo-v2/

Credenciais demonstrativas: `admin` / `admin`.

## Edição dos objetivos estratégicos

1. Entre na página e abra o detalhamento de uma etapa.
2. Use **Editar** dentro de um card para alterar suas informações.
3. Use **+ Novo card** para criar um objetivo.
4. As alterações são salvas como rascunho no navegador (`localStorage`).
5. Use **Exportar dados** para baixar `mes-yamaha-data.json`.
6. Use **Importar** para carregar um arquivo exportado anteriormente.

O arquivo inicial de referência está em `docs/mes-yamaha-data.json`. Para tornar
um rascunho oficial e igual para todos os usuários, substitua esse arquivo no
repositório e atualize também `docs/data.js`, ou encaminhe o JSON exportado para
publicação.

O navegador não grava diretamente no GitHub porque isso exigiria expor uma
credencial dentro de uma página pública. A exportação mantém o fluxo seguro.

## GitHub Pages

O conteúdo publicado fica em `docs/` e utiliza apenas HTML, CSS, JavaScript e
imagens. Não há servidor, banco de dados ou API externa.
