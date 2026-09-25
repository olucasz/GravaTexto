"""Rebuild offline content from the attributed BLIVRE release. Python 3.10+."""
from pathlib import Path
import json,re,hashlib,zipfile,sqlite3,unicodedata,collections
from curation import JOURNEYS
ROOT=Path(__file__).resolve().parents[1]
def dump(path,obj):
 (ROOT/path).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(b):return hashlib.sha256(b).hexdigest()
def norm(t):
 return ' '.join(re.findall(r'[^\W_]+', ''.join(c for c in unicodedata.normalize('NFD',t.casefold()) if unicodedata.category(c)!='Mn')))
TID='blivre-tr-2018.2.0'
NAMES='Gênesis|Êxodo|Levítico|Números|Deuteronômio|Josué|Juízes|Rute|1 Samuel|2 Samuel|1 Reis|2 Reis|1 Crônicas|2 Crônicas|Esdras|Neemias|Ester|Jó|Salmos|Provérbios|Eclesiastes|Cânticos|Isaías|Jeremias|Lamentações|Ezequiel|Daniel|Oseias|Joel|Amós|Obadias|Jonas|Miqueias|Naum|Habacuque|Sofonias|Ageu|Zacarias|Malaquias|Mateus|Marcos|Lucas|João|Atos|Romanos|1 Coríntios|2 Coríntios|Gálatas|Efésios|Filipenses|Colossenses|1 Tessalonicenses|2 Tessalonicenses|1 Timóteo|2 Timóteo|Tito|Filemom|Hebreus|Tiago|1 Pedro|2 Pedro|1 João|2 João|3 João|Judas|Apocalipse'.split('|')
ABBR='Gn Ex Lv Nm Dt Js Jz Rt 1Sm 2Sm 1Rs 2Rs 1Cr 2Cr Ed Ne Et Jó Sl Pv Ec Ct Is Jr Lm Ez Dn Os Jl Am Ob Jn Mq Na Hc Sf Ag Zc Ml Mt Mc Lc Jo At Rm 1Co 2Co Gl Ef Fp Cl 1Ts 2Ts 1Tm 2Tm Tt Fm Hb Tg 1Pe 2Pe 1Jo 2Jo 3Jo Jd Ap'.split()
rawzip=(ROOT/'source/bliv-tr_vpl.zip').read_bytes()
with zipfile.ZipFile(ROOT/'source/bliv-tr_vpl.zip') as z:raw=z.read('bliv-tr_vpl.txt')
source_rows=[]
for n,line in enumerate(raw.decode('utf-8-sig').splitlines(),1):
 m=re.fullmatch(r'(\S+) (\d+):(\d+) (.+)',line)
 assert m,(n,line)
 b,c,v,t=m.groups();source_rows.append((b,int(c),int(v),t,n))
codes=list(dict.fromkeys(x[0] for x in source_rows));assert len(codes)==len(NAMES)==66
books=[dict(id=c,name=NAMES[i],abbreviation=ABBR[i],testament='OT' if i<39 else 'NT',canonical_order=i+1) for i,c in enumerate(codes)]
bookmap={b['id']:b for b in books}
verses=[];byref={};versemap={}
for b,c,v,t,n in source_rows:
 vid=f'{TID}:{b}.{c}.{v}'
 row=dict(id=vid,translation_id=TID,book_id=b,chapter=c,verse=v,text=t,reference=f'{bookmap[b]["name"]} {c}:{v}',source_line=n,text_sha256=sha(t.encode()))
 verses.append(row);byref[f'{b} {c}:{v}']=row;versemap[vid]=row
assert len(verses)==31102 and len(versemap)==31102
translation=dict(id=TID,name='Bíblia Livre',abbreviation='BLIVRE',language='pt-BR',edition='Textus Receptus',release='2018.2.0',release_date='2018-02-25',canon='66-book Protestant canon',license='CC-BY-3.0-BR',license_url='https://creativecommons.org/licenses/by/3.0/br/',authors=['Diego Santos','Mario Sérgio','Marco Teles'],source_url='https://github.com/blivre/BibliaLivre/releases/tag/2018.2.0',download_url='https://github.com/blivre/BibliaLivre/releases/download/2018.2.0/bliv-tr_vpl.zip',source_archive_sha256=sha(rawzip),source_vpl_sha256=sha(raw),retrieved_on='2026-09-25',attribution='Todas as Escrituras em português citadas são da Bíblia Livre (BLIVRE), Copyright © Diego Santos, Mario Sérgio e Marco Teles, https://sites.google.com/site/biblialivre/ — fevereiro de 2018, edição Textus Receptus, release 2018.2.0. Licença Creative Commons Atribuição 3.0 Brasil: https://creativecommons.org/licenses/by/3.0/br/. Organização em jornadas e exercícios pelo projeto GravaTexto. Texto-fonte preservado; ajustes de apresentação e recortes identificados nos itens de aprendizagem.')
collections_data=[dict(id=a,title=b,position=i+1) for i,(a,b) in enumerate([('foundations','Primeiros passos'),('old-testament','Antigo Testamento'),('new-testament','Novo Testamento'),('with-christ','Caminhando com Cristo')])]
journeys=[];units=[];links=[];items={}
HEADINGS={'PSA 119:105':'[Nun] :','PSA 23:1':'Salmo de Davi:','PSA 27:1':'Salmo de Davi:','PSA 46:1':'Cântico sobre “Alamote”; para o regente, dos filhos de Coré:'}
MVP_CONTEXT={
'1TH 5:16':'Uma das orientações finais de Paulo à comunidade. Leia com as instruções sobre oração e gratidão nos versos seguintes.',
'1TH 5:17':'O chamado à oração aparece entre as orientações de alegria e gratidão em 1 Tessalonicenses 5:16–18.',
'1JO 4:19':'O amor de Deus vem primeiro. O trecho prossegue ligando o amor a Deus ao amor pelo irmão.',
'PSA 119:105':'A imagem da lâmpada apresenta a palavra de Deus como orientação para o caminho. O título hebraico da seção não faz parte do exercício.',
'PHI 4:13':'Paulo fala de aprender a viver tanto em abundância como em necessidade. O contexto é contentamento e força em Cristo.',
'PRO 3:5':'A orientação convida a confiar em Deus. O verso seguinte continua o pensamento sobre reconhecê-lo nos caminhos.',
'PSA 56:3':'O salmista expressa medo em meio à oposição e responde com confiança em Deus.',
'PSA 121:2':'O salmo identifica Deus, criador dos céus e da terra, como a origem do socorro.',
'1PE 5:7':'O verso continua a orientação de humildade diante de Deus e convida a entregar a ele as ansiedades.',
'ROM 12:12':'A frase reúne esperança, paciência e oração numa seção sobre a vida cristã em comunidade.',
'PSA 37:5':'O pensamento continua no verso 6. A jornada memoriza o verso 5 integral, preservando a ligação com seu contexto.',
'MAT 11:28':'Jesus convida os cansados a virem a ele. Nos versos seguintes, o convite inclui aprender dele e tomar seu jugo.'}
for pos,(jid,cid,title,desc,diff,mvp,refs) in enumerate(JOURNEYS,1):
 journeys.append(dict(id=jid,collection_id=cid,title=title,description=desc,difficulty=diff,position=pos,availability='prototype' if mvp else 'planned',editorial_status='draft',verse_count=6))
 for k in range(3):units.append(dict(id=f'{jid}-stage-{k+1}',journey_id=jid,title=f'Etapa {k+1}',position=k+1))
 for i,ref in enumerate(refs):
  vr=byref[ref];iid=vr['id']+':learning-v1'
  links.append(dict(unit_id=f'{jid}-stage-{i//2+1}',verse_id=vr['id'],learning_item_id=iid,position=i%2+1))
  if iid in items:continue
  start=len(HEADINGS.get(ref,''));assert vr['text'].startswith(HEADINGS.get(ref,''))
  excerpt=vr['text'][start:];display=excerpt.replace('[','').replace(']','');display=re.sub(r'\s+([,.;:!?])',r'\1',display)
  transforms=[]
  if start:transforms.append(dict(type='exclude_editorial_heading',excluded_text=vr['text'][:start]))
  if '[' in excerpt:transforms.append(dict(type='hide_bracket_delimiters',note='Manter todas as palavras entre colchetes; ocultar apenas os sinais de apresentação.'))
  if re.search(r'\s+[,.;:!?]',excerpt):transforms.append(dict(type='remove_space_before_punctuation'))
  toks=[dict(id=f'{iid}:token:{k}',index=k,surface=m.group(),start=m.start(),end=m.end()) for k,m in enumerate(re.finditer(r'\S+',display))]
  ctx=[v['id'] for v in verses if v['book_id']==vr['book_id'] and v['chapter']==vr['chapter'] and max(1,vr['verse']-2)<=v['verse']<=vr['verse']+2]
  items[iid]=dict(id=iid,verse_id=vr['id'],reference=vr['reference'],source_span=dict(start=start,end=len(vr['text']),index_unit='unicode_code_points'),text=display,display_transformations=transforms,word_count=len(toks),tokens=toks,length_band='short' if len(toks)<=12 else 'medium' if len(toks)<=25 else 'long',context_verse_ids=ctx,context_note=MVP_CONTEXT.get(ref),editorial_status='draft',production_ready=False)
# Curated gap targets and distractors; distractors are options, never stored as biblical text.
GAPS={
'1TH 5:16':('sempre',['hoje','amanhã']), '1TH 5:17':('cessar',['falar','esperar']),
'1JO 4:19':('primeiro',['depois','agora']), 'PSA 119:105':('lâmpada',['escudo','abrigo']),
'PHI 4:13':('fortalece',['conhece','acompanha']), 'PRO 3:5':('coração',['tempo','talento']),
'PSA 56:3':('medo',['pressa','dúvida']), 'PSA 121:2':('socorro',['caminho','descanso']),
'1PE 5:7':('ansiedade',['alegria','vitória']), 'ROM 12:12':('esperança',['riqueza','força']),
'PSA 37:5':('caminho',['pedido','pensamento']), 'MAT 11:28':('descansar',['caminhar','esperar'])}
puzzles=[]
def q(iid,kind,dimension,payload):
 qid=f'{iid}:{kind}';puzzles.append(dict(id=qid,learning_item_id=iid,kind=kind,target_dimension=dimension,payload=payload,editorial_status='draft',production_ready=False));return qid
for j in JOURNEYS[:2]:
 refs=j[-1]
 for ix,ref in enumerate(refs):
  vr=byref[ref];iid=vr['id']+':learning-v1';it=items[iid];t=it['text'];other=[items[byref[r]['id']+':learning-v1'] for r in refs if r!=ref]
  options=[it]+other[:2]
  q(iid,'locate_reference','reference',dict(prompt='Onde está escrito?',text=t,options=[dict(id=a['verse_id'],label=a['reference']) for a in options],correct_option_id=vr['id'],shuffle_options=True))
  q(iid,'identify_text','text_reference',dict(prompt=f'Qual texto corresponde a {vr["reference"]}?',reference=vr['reference'],options=[dict(id=a['verse_id'],label=a['text']) for a in options],correct_option_id=vr['id'],shuffle_options=True))
  target,wrong=GAPS[ref];m=re.search(r'\b'+re.escape(target)+r'\b',t,re.I);assert m
  q(iid,'fill_gap','text',dict(prompt='Complete o trecho.',reference=vr['reference'],prefix=t[:m.start()],suffix=t[m.end():],gap_span=dict(start=m.start(),end=m.end(),index_unit='unicode_code_points'),options=[dict(id='correct',label=m.group())]+[dict(id=f'distractor-{k}',label=s) for k,s in enumerate(wrong)],correct_option_id='correct',shuffle_options=True))
  # Too-short verses do not get artificial phrase puzzles.
  if it['word_count']>=6:
   tokens=it['tokens'];cut=tokens[max(2,len(tokens)//2)]['start'];suffix=t[cut:]
   options=[dict(id='correct',label=suffix)]+[dict(id=a['verse_id'],label=a['text'][a['tokens'][max(1,len(a['tokens'])//2)]['start']:]) for a in other if a['word_count']>=6][:2]
   q(iid,'choose_continuation','text',dict(prompt='Como continua?',reference=vr['reference'],prefix=t[:cut],options=options,correct_option_id='correct',shuffle_options=True,distractors_are_excerpts_from_other_verses=True))
   # Store exact string fragments, including separating whitespace, for lossless reassembly.
   count=2 if len(tokens)<10 else 3
   boundaries=[0]+[tokens[len(tokens)*k//count]['start'] for k in range(1,count)]+[len(t)]
   pieces=[dict(id=f'piece-{k}',text=t[a:b],display_label=t[a:b].strip()) for k,(a,b) in enumerate(zip(boundaries,boundaries[1:]))]
   q(iid,'order_fragments','text',dict(prompt='Monte a passagem.',reference=vr['reference'],pieces=pieces,correct_order=[a['id'] for a in pieces],shuffle_pieces=True))
 # Two matching groups of 3, with progress tracked separately for each pair.
 for group in range(2):
  ids=[byref[r]['id']+':learning-v1' for r in refs[group*3:group*3+3]]
  q(ids[0],f'match_pairs_{group+1}','reference',dict(prompt='Ligue cada texto à sua referência.',pairs=[dict(learning_item_id=k,verse_id=items[k]['verse_id'],reference=items[k]['reference'],text=items[k]['text']) for k in ids],shuffle_left=True,shuffle_right=True,score_each_pair_separately=True))
policy=dict(version='0.1',status='prototype_proposal',typing_required=False,voice_enabled=False,session=dict(first_session_new_verses=2,later_session_max_new_verses=1,max_review_verses=2,base_exercise_count=8,max_reinforcement_exercises=3,new_text_requires_reading_card=True,avoid_consecutive_same_kind=True,min_intervening_exercises_before_retry=2,option_order_seeded=True,match_only_previously_introduced_verses=True),feedback=dict(timing='immediate_after_confirmation',show_correct_answer=True,advance_after_feedback=True,repeat_wrong_at_end=True,retry_same_dimension=True,second_failure='show_correction_and_schedule_next_day',no_lives=True),progress=dict(key=['user_id','translation_id','verse_id','target_dimension'],dimensions=['text','reference'],assisted_success_advances_interval=False,initial_review_days=1,independent_review_intervals_days=[1,3,7,14,30],repeat_wrong_dimension_next_day=True,session_completion_does_not_equal_mastery=True,timezone='user_configured'),publication=dict(prototype_filter="availability = 'prototype'",production_requires_editorial_approval=True))
# Deterministic example schedule, not a persisted user session or production scheduler.
examples=[]
for j in JOURNEYS[:2]:
 refs=j[-1];ids=[byref[r]['id']+':learning-v1' for r in refs]
 for day,(new,review) in enumerate([([0,1],[]),([2],[0,1]),([3],[1,2])],1):
  active=new+review;kinds=['locate_reference','fill_gap','identify_text','locate_reference','fill_gap','identify_text','fill_gap','locate_reference'];chosen=[]
  for ix,kind in enumerate(kinds):
   item=ids[active[ix%len(active)]]
   # Vary longer-verse sessions with fragment/continuation exercises.
   if day>1 and ix in [3,5] and item==ids[new[0]]:
    possible='order_fragments' if ix==3 else 'choose_continuation'
    if any(p['id']==f'{item}:{possible}' for p in puzzles):kind=possible
   chosen.append(f'{item}:{kind}')
  examples.append(dict(id=f'{j[0]}-example-day-{day}',journey_id=j[0],relative_day=day,new_learning_item_ids=[ids[i] for i in new],review_learning_item_ids=[ids[i] for i in review],prelude=[dict(kind='read_and_context',learning_item_id=ids[i]) for i in new],exercise_ids=chosen,reinforcement='Append at most 3 questions for failed dimensions, after base exercises; failures on the last base question defer if fewer than 2 intervening questions.',note='Exemplo didático. Vencimentos reais e seleção individual vêm do histórico; embaralhar alternativas em runtime.'))
dump('data/translation.json',translation);dump('data/books.json',books);dump('data/verses.json',verses);dump('data/collections.json',collections_data);dump('data/journeys.json',journeys);dump('data/units.json',units);dump('data/unit_verses.json',links);dump('data/learning_items.json',list(items.values()));dump('data/puzzles-mvp.json',puzzles);dump('data/session-policy.json',policy);dump('examples/sessions.json',examples)
# Minimal standalone front-end fixture, no 31k-verse bundle needed.
mvpids={byref[r]['id'] for j in JOURNEYS[:2] for r in j[-1]}
dump('data/mvp-bundle.json',dict(translation=translation,collections=[collections_data[0]],journeys=journeys[:2],units=[u for u in units if u['journey_id'] in [j['id'] for j in journeys[:2]]],unit_verses=[l for l in links if l['unit_id'].rsplit('-stage-',1)[0] in [j['id'] for j in journeys[:2]]],verses=[v for v in verses if v['id'] in mvpids],learning_items=[it for it in items.values() if it['verse_id'] in mvpids],puzzles=puzzles,policy=policy))
# Create relational database with enforced foreign keys; full payloads retained as JSON text.
schema='''PRAGMA foreign_keys=ON;
CREATE TABLE translations(id TEXT PRIMARY KEY, name TEXT NOT NULL, license TEXT NOT NULL, metadata_json TEXT NOT NULL);
CREATE TABLE books(id TEXT PRIMARY KEY, name TEXT NOT NULL, testament TEXT NOT NULL CHECK(testament IN ('OT','NT')), canonical_order INTEGER UNIQUE NOT NULL);
CREATE TABLE verses(id TEXT PRIMARY KEY, translation_id TEXT NOT NULL REFERENCES translations(id), book_id TEXT NOT NULL REFERENCES books(id), chapter INTEGER NOT NULL CHECK(chapter>0), verse INTEGER NOT NULL CHECK(verse>0), text TEXT NOT NULL, text_sha256 TEXT NOT NULL, UNIQUE(translation_id,book_id,chapter,verse));
CREATE TABLE collections(id TEXT PRIMARY KEY,title TEXT NOT NULL,position INTEGER NOT NULL);
CREATE TABLE journeys(id TEXT PRIMARY KEY,collection_id TEXT NOT NULL REFERENCES collections(id),title TEXT NOT NULL,description TEXT NOT NULL,difficulty INTEGER NOT NULL,availability TEXT NOT NULL,editorial_status TEXT NOT NULL,position INTEGER NOT NULL);
CREATE TABLE units(id TEXT PRIMARY KEY,journey_id TEXT NOT NULL REFERENCES journeys(id),title TEXT NOT NULL,position INTEGER NOT NULL,UNIQUE(journey_id,position));
CREATE TABLE learning_items(id TEXT PRIMARY KEY,verse_id TEXT NOT NULL REFERENCES verses(id),text TEXT NOT NULL,metadata_json TEXT NOT NULL);
CREATE TABLE unit_verses(unit_id TEXT NOT NULL REFERENCES units(id),verse_id TEXT NOT NULL REFERENCES verses(id),learning_item_id TEXT NOT NULL REFERENCES learning_items(id),position INTEGER NOT NULL,PRIMARY KEY(unit_id,position),UNIQUE(unit_id,verse_id));
CREATE TABLE puzzles(id TEXT PRIMARY KEY,learning_item_id TEXT NOT NULL REFERENCES learning_items(id),kind TEXT NOT NULL,target_dimension TEXT NOT NULL,payload_json TEXT NOT NULL,editorial_status TEXT NOT NULL);
CREATE INDEX idx_verses_lookup ON verses(translation_id,book_id,chapter,verse);
CREATE INDEX idx_units_journey ON units(journey_id,position);
CREATE INDEX idx_puzzles_item ON puzzles(learning_item_id,kind);
'''
(ROOT/'schema.sql').write_text(schema,encoding='utf-8');db=ROOT/'gravatexto.sqlite';db.unlink(missing_ok=True);con=sqlite3.connect(db);con.executescript(schema)
jstr=lambda x:json.dumps(x,ensure_ascii=False)
con.execute('INSERT INTO translations VALUES(?,?,?,?)',(TID,translation['name'],translation['license'],jstr(translation)))
con.executemany('INSERT INTO books VALUES(?,?,?,?)',[(x['id'],x['name'],x['testament'],x['canonical_order']) for x in books])
con.executemany('INSERT INTO verses VALUES(?,?,?,?,?,?,?)',[(x['id'],TID,x['book_id'],x['chapter'],x['verse'],x['text'],x['text_sha256']) for x in verses])
con.executemany('INSERT INTO collections VALUES(?,?,?)',[(x['id'],x['title'],x['position']) for x in collections_data])
con.executemany('INSERT INTO journeys VALUES(?,?,?,?,?,?,?,?)',[(x['id'],x['collection_id'],x['title'],x['description'],x['difficulty'],x['availability'],x['editorial_status'],x['position']) for x in journeys])
con.executemany('INSERT INTO units VALUES(?,?,?,?)',[(x['id'],x['journey_id'],x['title'],x['position']) for x in units])
con.executemany('INSERT INTO learning_items VALUES(?,?,?,?)',[(x['id'],x['verse_id'],x['text'],jstr(x)) for x in items.values()])
con.executemany('INSERT INTO unit_verses VALUES(?,?,?,?)',[(x['unit_id'],x['verse_id'],x['learning_item_id'],x['position']) for x in links])
con.executemany('INSERT INTO puzzles VALUES(?,?,?,?,?,?)',[(x['id'],x['learning_item_id'],x['kind'],x['target_dimension'],jstr(x['payload']),x['editorial_status']) for x in puzzles]);con.commit()
assert con.execute('PRAGMA integrity_check').fetchone()[0]=='ok';assert not con.execute('PRAGMA foreign_key_check').fetchall()
# Invariants on conversion, curation, questions and source spans.
for it in items.values():
 vr=versemap[it['verse_id']];s=it['source_span'];text=vr['text'][s['start']:s['end']];expected=re.sub(r'\s+([,.;:!?])',r'\1',text.replace('[','').replace(']',''));assert expected==it['text']
 assert all(vid in versemap for vid in it['context_verse_ids'])
for p in puzzles:
 it=items[p['learning_item_id']];d=p['payload']
 if 'options' in d:
  assert len(d['options'])==3
  assert len({norm(x['label']) for x in d['options']})==3,p['id']
  assert sum(x['id']==d['correct_option_id'] for x in d['options'])==1
 if p['kind']=='fill_gap':assert d['prefix']+next(x['label'] for x in d['options'] if x['id']=='correct')+d['suffix']==it['text']
 if p['kind']=='choose_continuation':assert d['prefix']+next(x['label'] for x in d['options'] if x['id']=='correct')==it['text']
 if p['kind']=='order_fragments':assert ''.join(x['text'] for x in d['pieces'])==it['text']
 if p['kind'].startswith('match_pairs'):
  assert len({x['verse_id'] for x in d['pairs']})==3
pids={p['id'] for p in puzzles}
for ex in examples:
 assert all(p in pids for p in ex['exercise_ids']);types=[p.rsplit(':',1)[-1] for p in ex['exercise_ids']];assert all(a!=b for a,b in zip(types,types[1:]))
report=dict(books=len(books),chapters=len({(v['book_id'],v['chapter']) for v in verses}),verses=len(verses),collections=len(collections_data),journeys=len(journeys),prototype_journeys=2,units=len(units),journey_assignments=len(links),unique_curated_verses=len(items),prototype_verses=len(mvpids),puzzles=len(puzzles),example_sessions=len(examples),canonical_text_preserved=True,duplicate_references=0,missing_curated_references=0,foreign_key_errors=0,sqlite_integrity='ok',checks=['source line parsing','unique references','exact canonical text and hashes','learning span transformations','foreign keys','three distinct alternatives and one correct option','lossless fragment reconstruction','gap and continuation reconstruction','sample session references and non-consecutive exercise types'],editorial_review='Pending human review; no item is production approved.')
dump('validation-report.json',report)
con.close()
# Human-readable journey catalogue.
md=['# Catálogo de jornadas — GravaTexto v0.1','', 'Curadoria inicial proposta. Duas jornadas para protótipo; demais planejadas. Nenhuma está aprovada editorialmente para publicação. As jornadas são seleções, não cobrem todos os capítulos nem todos os versículos da Bíblia.','']
for j in journeys:
 md.extend([f'## {j["title"]}', '',f'Coleção: {next(c["title"] for c in collections_data if c["id"]==j["collection_id"])} · Dificuldade editorial: {j["difficulty"]}/3 · {j["availability"]}', '',j['description'],''])
 for u in [u for u in units if u['journey_id']==j['id']]:
  md.extend([f'### {u["title"]}',''])
  for l in [l for l in links if l['unit_id']==u['id']]:
   it=items[l['learning_item_id']];md.extend([f'**{it["reference"]} — BLIVRE**', '',it['text'],''])
   if it['context_note']:md.extend(['Contexto proposto: '+it['context_note'],''])
   if it['display_transformations']:md.extend(['Apresentação: '+', '.join(t['type'] for t in it['display_transformations'])+'. Texto original disponível em verses.json.',''])
(ROOT/'docs/jornadas.md').write_text('\n'.join(md),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
