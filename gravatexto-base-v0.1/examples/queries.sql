-- Listar as duas jornadas de protótipo.
SELECT id,title,description FROM journeys
WHERE availability='prototype' ORDER BY position;

-- Etapas e textos prontos para exibir; texto original ao lado.
SELECT j.title,u.position AS stage,l.position AS verse_order,
       b.name,v.chapter,v.verse,v.text AS source_text,i.text AS display_text
FROM journeys j JOIN units u ON u.journey_id=j.id
JOIN unit_verses l ON l.unit_id=u.id
JOIN verses v ON v.id=l.verse_id
JOIN books b ON b.id=v.book_id
JOIN learning_items i ON i.id=l.learning_item_id
WHERE j.id='first-verses'
ORDER BY u.position,l.position;

-- Referência exata, independente da jornada.
SELECT * FROM verses WHERE translation_id='blivre-tr-2018.2.0'
AND book_id='ROM' AND chapter=8 AND verse=1;

-- Buscar todos os puzzles de um item sem requerer digitação.
SELECT kind,target_dimension,payload_json FROM puzzles
WHERE learning_item_id='blivre-tr-2018.2.0:PHI.4.13:learning-v1';
