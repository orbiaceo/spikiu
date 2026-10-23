"""Erzeugt content/verbos.json – Verbtabellen für Gramática A.
Modellverben: Endungen rot. Alle anderen: rot ist, was vom regelmäßigen Muster abweicht."""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TENSES = ['Presente', 'Perfecto', 'Indefinido', 'Imperfecto', 'Futuro']
HABER = ['he', 'has', 'ha', 'hemos', 'habéis', 'han']
END = {
 'ar': {'Presente': ['o','as','a','amos','áis','an'], 'Indefinido': ['é','aste','ó','amos','asteis','aron'], 'Imperfecto': ['aba','abas','aba','ábamos','abais','aban']},
 'er': {'Presente': ['o','es','e','emos','éis','en'], 'Indefinido': ['í','iste','ió','imos','isteis','ieron'], 'Imperfecto': ['ía','ías','ía','íamos','íais','ían']},
 'ir': {'Presente': ['o','es','e','imos','ís','en'], 'Indefinido': ['í','iste','ió','imos','isteis','ieron'], 'Imperfecto': ['ía','ías','ía','íamos','íais','ían']},
}
FUT = ['é','ás','á','emos','éis','án']

def regular(inf):
    cl = inf[-2:].replace('ír', 'ir')
    st = inf[:-2]
    f = {t: [st + e for e in END[cl][t]] for t in ('Presente', 'Indefinido', 'Imperfecto')}
    f['Futuro'] = [inf.replace('í', 'i') + e for e in FUT]
    part = st + ('ado' if cl == 'ar' else 'ido')
    f['Perfecto'] = [h + ' ' + part for h in HABER]
    return f, part, st + ('ando' if cl == 'ar' else 'iendo')

def model(inf, de, imp):
    cl = inf[-2:]; st = inf[:-2]
    f = {t: [st + '<b>' + e + '</b>' for e in END[cl][t]] for t in ('Presente', 'Indefinido', 'Imperfecto')}
    f['Futuro'] = [inf + '<b>' + e + '</b>' for e in FUT]
    part = st + ('<b>ado</b>' if cl == 'ar' else '<b>ido</b>')
    f['Perfecto'] = [h + ' ' + part for h in HABER]
    return {'inf': inf, 'de': de, 'model': f'Muster für alle regelmäßigen Verben auf -{cl}', 'forms': f,
            'part': part, 'ger': st + ('<b>ando</b>' if cl == 'ar' else '<b>iendo</b>'), 'imp': imp}

def irr(inf, de, imp, pres=None, indef=None, impf=None, futstem=None, part=None, ger=None, note=None):
    reg, rpart, rger = regular(inf)
    f = {}
    f['Presente'] = pres.split() if pres else reg['Presente']
    f['Indefinido'] = indef.split() if indef else reg['Indefinido']
    f['Imperfecto'] = impf.split() if impf else reg['Imperfecto']
    f['Futuro'] = [futstem + e for e in FUT] if futstem else reg['Futuro']
    p = part or rpart
    f['Perfecto'] = [h + ' ' + p for h in HABER]
    out = {}
    for t in TENSES:
        out[t] = [x if x == r else f'<b>{x}</b>' for x, r in zip(f[t], reg[t])]
    return {'inf': inf, 'de': de, 'forms': out, 'part': p if p == rpart else f'<b>{p}</b>',
            'ger': (ger or rger) if (ger or rger) == rger else f'<b>{ger}</b>', 'imp': imp, 'note': note}

V = [
 model('hablar', 'sprechen', 'habla / hable'),
 model('comer', 'essen', 'come / coma'),
 model('vivir', 'leben, wohnen', 'vive / viva'),
 irr('ser', 'sein (Wesen)', 'sé / sea', pres='soy eres es somos sois son', indef='fui fuiste fue fuimos fuisteis fueron', impf='era eras era éramos erais eran'),
 irr('estar', 'sein (Zustand, Ort)', 'está / esté', pres='estoy estás está estamos estáis están', indef='estuve estuviste estuvo estuvimos estuvisteis estuvieron'),
 irr('tener', 'haben', 'ten / tenga', pres='tengo tienes tiene tenemos tenéis tienen', indef='tuve tuviste tuvo tuvimos tuvisteis tuvieron', futstem='tendr'),
 irr('ir', 'gehen, fahren', 've / vaya', pres='voy vas va vamos vais van', indef='fui fuiste fue fuimos fuisteis fueron', impf='iba ibas iba íbamos ibais iban', ger='yendo', note='Indefinido wie <es>ser</es>: <es>fui</es> = ich ging / ich war'),
 irr('hacer', 'machen, tun', 'haz / haga', pres='hago haces hace hacemos hacéis hacen', indef='hice hiciste hizo hicimos hicisteis hicieron', futstem='har', part='hecho'),
 irr('poder', 'können', '–', pres='puedo puedes puede podemos podéis pueden', indef='pude pudiste pudo pudimos pudisteis pudieron', futstem='podr', ger='pudiendo'),
 irr('querer', 'wollen, lieben', 'quiere / quiera', pres='quiero quieres quiere queremos queréis quieren', indef='quise quisiste quiso quisimos quisisteis quisieron', futstem='querr'),
 irr('decir', 'sagen', 'di / diga', pres='digo dices dice decimos decís dicen', indef='dije dijiste dijo dijimos dijisteis dijeron', futstem='dir', part='dicho', ger='diciendo'),
 irr('venir', 'kommen', 'ven / venga', pres='vengo vienes viene venimos venís vienen', indef='vine viniste vino vinimos vinisteis vinieron', futstem='vendr', ger='viniendo'),
 irr('dar', 'geben', 'da / dé', pres='doy das da damos dais dan', indef='di diste dio dimos disteis dieron'),
 irr('saber', 'wissen, können (gelernt)', 'sabe / sepa', pres='sé sabes sabe sabemos sabéis saben', indef='supe supiste supo supimos supisteis supieron', futstem='sabr'),
 irr('poner', 'stellen, legen', 'pon / ponga', pres='pongo pones pone ponemos ponéis ponen', indef='puse pusiste puso pusimos pusisteis pusieron', futstem='pondr', part='puesto'),
 irr('salir', 'ausgehen, abfahren', 'sal / salga', pres='salgo sales sale salimos salís salen', futstem='saldr'),
 irr('ver', 'sehen', 've / vea', pres='veo ves ve vemos veis ven', indef='vi viste vio vimos visteis vieron', impf='veía veías veía veíamos veíais veían', part='visto'),
 irr('conocer', 'kennen', 'conoce / conozca', pres='conozco conoces conoce conocemos conocéis conocen'),
 irr('pedir', 'bitten, bestellen', 'pide / pida', pres='pido pides pide pedimos pedís piden', indef='pedí pediste pidió pedimos pedisteis pidieron', ger='pidiendo', note='wie <es>pedir</es>: <es>repetir, servir, vestirse</es>'),
 irr('dormir', 'schlafen', 'duerme / duerma', pres='duermo duermes duerme dormimos dormís duermen', indef='dormí dormiste durmió dormimos dormisteis durmieron', ger='durmiendo'),
 irr('volver', 'zurückkommen', 'vuelve / vuelva', pres='vuelvo vuelves vuelve volvemos volvéis vuelven', part='vuelto', note='wie <es>volver</es>: <es>poder, contar, encontrar, costar</es> (o → ue)'),
 irr('empezar', 'anfangen', 'empieza / empiece', pres='empiezo empiezas empieza empezamos empezáis empiezan', indef='empecé empezaste empezó empezamos empezasteis empezaron', note='wie <es>empezar</es>: <es>pensar, cerrar, despertarse</es> (e → ie)'),
 irr('jugar', 'spielen', 'juega / juegue', pres='juego juegas juega jugamos jugáis juegan', indef='jugué jugaste jugó jugamos jugasteis jugaron'),
 irr('oír', 'hören', 'oye / oiga', pres='oigo oyes oye oímos oís oyen', indef='oí oíste oyó oímos oísteis oyeron', impf='oía oías oía oíamos oíais oían', part='oído', ger='oyendo'),
 irr('leer', 'lesen', 'lee / lea', indef='leí leíste leyó leímos leísteis leyeron', part='leído', ger='leyendo'),
 irr('traer', 'bringen', 'trae / traiga', pres='traigo traes trae traemos traéis traen', indef='traje trajiste trajo trajimos trajisteis trajeron', part='traído', ger='trayendo'),
 irr('llegar', 'ankommen', 'llega / llegue', indef='llegué llegaste llegó llegamos llegasteis llegaron', note='<es>-gar</es> → <es>-gué</es>: <es>pagar, jugar</es>'),
 irr('buscar', 'suchen', 'busca / busque', indef='busqué buscaste buscó buscamos buscasteis buscaron', note='<es>-car</es> → <es>-qué</es>: <es>tocar, sacar, explicar</es>'),
]
for v in V:
    if v.get('note') is None:
        v.pop('note', None)
json.dump({'tenses': TENSES, 'verbs': V}, open(os.path.join(ROOT, 'content', 'verbos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(V), 'Verben')
