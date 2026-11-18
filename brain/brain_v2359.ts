// blindKeyboardTranscribe v23.57 (18 Okt): nog 'n Stierman-variant (enkel n) bygevoeg na lewende AF-toets. v23.56 (18 Okt 10-min opleiding, Adrian se versoek): 5 nuwe DEELMAN-garbles uit sy 08:47-09:28 toetse (fred sturman/stjoman/stiehlmann, fritz stiermann, frits diooman -> Fritz Deelman, AF+EN) + DEELMAN-konteksreël in SYS.af/SYS.en/SYS.trAF sodat onbekende variantvorme ook gevang word. Vorige v23.55 (18 Okt): FRITZ DEELMAN geleer uit Adrian se 17-18 Okt diktate (frits dielman/stielman, fred stialman/dioman/stjaumann -> Fritz Deelman, AF+EN). Vorige v23.54 (17 Okt, 09:45): SDK wil 'n File hê (nie Blob nie) vir UploadPrivateFile -> new File wrapper. Vorige v23.53 (17 Okt, 09:35): ear-klank blywend gestoor via Base44 file storage (privaat eerste, publiek terugval, AUDIO2-veld in meta) — JMedia content_b64 veld-limiet te klein; tmpfiles verval te gou vir opleiding.
// blindKeyboardTranscribe v23.52 (17 Okt, 09:20): YOLANDI geleer uit Adrian se regte toetse (jolandi/jolande/you'll andy/you'll landy/you'll learn d -> Yolandi, AF+EN). Vorige v23.51:
// blindKeyboardTranscribe v23.50 (17 Okt, Adrian: 'hoor reg maar skryf verkeerde woorde'): ear bêre nou die regte klank as b64 in JMedia (self-pruning 8/mode) sodat opleiding ALTYD kan her-luister; AF_FIX doen soof->doen alsof.
// blindKeyboardTranscribe v23.49 (17 Okt, Adrian se Mandy Keyboard-versoek): AF_FIX snaks->snaaks, snaks geels->snaaks gesels, keer daarin->Kurt Darren; SYS.af musiek-konteks nog->na; trAF luister-na reël + voorbeeld + kloktyd-tikfout. NOOD-HERSTEL: die 17 Okt uitrol het per ongeluk op die verweesde v23.45-kopie gebaseer; hierdie herstel die v23.46-23.48 inskrywings (Hofmeyr AF+EN, mustang spaceship, kaderin/kedaran/unita duplessis/anita duplasi/wanita duplisi EN_FIX).
// blindKeyboardTranscribe v23.45 — auto-train 21:00 (12 Okt): sy gereelde 'Baie lekker, dankie' kom soms as heel-string nie-Latynse skrif-garbles deur (hy het 13:29-13:30 beide 'n Devanagari- en 'n Urdu/Persies-weergawe gekry; ook 'n Ek+foon-variant met DOOD audio, weggelaat). Heel-string deterministiese fix in afFix slegs. Vorige: 10-min opleiding (Adrian 12 Okt): Eno van Maart naam-opleiding (Emo Adams vals-fiks gefix), Cyrillic Катарин-wag, EN spin ask->been asked, kertarensing->Kurt Darren sing, amberbers->hamburgers, klubwerf->Klipwerf. Alles van v23.41: fix=0 rou modus.
// v23.45 (13 Okt, Adrian se versoek): GEMINI-spanlid — platformGemini (Gemini 3.8 Flash) werk nou aktief saam in AF- en Vertaal-modes: agterbank in groqLLM-leer + nuwe herstel-paaie (weierings-wag, TR-weierings-wag, toEN-echo, toAF-echo, Duits/Nederlands-herstel, poleerpas).
// v23.7: Klipwerf; minuut fix only after digits. v23.6 auto-train: snacks->snaaks, uitgekond->uitgekom, gaat->gaan, EN Myness->My name is.
// Server-side brain for Blind AI Keyboard v16 + Mandy Keyboard v1. NO APK change needed.
// v16 APK contract: multipart lang=auto|en|af, translate=1|0, clean=1, file=voice.wav -> {"success":true,"text"}

// Whisper hallucination patterns that appear on silent/empty audio — never real dictation
const HALLU = /ondertitels|amara\.org|frikaans\.com|bedankt voor het kijken|dank u voor het kijken|thank you for watching|dank voor het kijken|mentemea|gemeenschap van amara|subscrib(?:e|ing)|Ek sien nie enige teks|geen teks om te herskryf|teks om te herskryf nie/i;

const DG_KEY = ((globalThis as any).process?.env?.DEEPGRAM_API_KEY) || "bbb35fbb02c786c6360e235d8a39e355977e41fa";
const GROQ_KEY = ((globalThis as any).process?.env?.AI_API_KEY) || "gsk_4GlxIaWTQy0f7iN8cTB1AWGdqvnLctezf4pZk0R2NQbkvEBcWq4Ha";

const AF_PROMPT = "Afrikaanse diktasie vir 'n sleutelbord. Transkribeer presies wat gesê word in korrekte geskrewe Afrikaans, nooit Nederlands of Duits nie. Algemene woorde: goeie môre, goeie middag, goeie aand, hoe gaan dit, vandag, môre, Maandag, Dinsdag, Woensdag, Donderdag, Vrydag, Saterdag, Sondag, vanmiddag, middagete, oggend, baie, nie, dankie, asseblief, gisteraand, geen probleem nie, dis waar, dis so, vrugte, Desember, Oktober, Januarie, winter, somer, foon, laai, verstaan, deurmekaar, antwoord, terug, moeg, geslaap, snaaks, uitgekom, minute, hamburgers, hamburger, bly, bietjie, ontbyt, asseblief, inkopies, braaivleis, verkeerd, heerlik, vuur, gekuier, boerewors, slaghuis, battery, pap, kinders, swem, dam, vroeg, ry, almal, julle, gisteraand, Saterdag, gou, Kersfees, kuier, hoor, amper, verstaan, Klipwerf, klip, werf, gesond, snaakste ding gebeur, hond, week, lank, sleg, Vrydagaand, Donderdagmiddag, medisyne, drink, gesels, lag, saam. Suid-Afrikaanse kunstenaars en name: Kurt Darren, Juanita du Plessis, Laurika Rauch, Steve Hofmeyr, Bok van Blerk, Refentse, Lianie May, Bobby van Jaarsveld, Emo Adams, Eno van Maart. Radiowoordes vir die stasie en die ruimteprogram: nuusbulletin, nuusbulletins, uitsending, episode, opneem, klaarmaak, Worcester, Karoo, Carnarvon, Kaleidoscope, Die Bankroof, Ruimtekaart, ruimteweer, sonkol, sonkolle, meteore, vuurpyl, teleskoop.";
const EN_PROMPT = "Keyboard dictation in South African English. Transcribe exactly what is spoken, spelling local words correctly (bakkie, braai, howzit, lekker, just now).";
const ANY_PROMPT = "Dictation in English or Afrikaans. Transcribe exactly what is spoken.";

const LADDER = [
  { model: "qwen/qwen3.8-27b", extra: {} },
  { model: "gpt-oss-20b", extra: { reasoning_effort: "low" } },
  { model: "gpt-oss-120b", extra: { reasoning_effort: "low" } },
];
// v23.12: translate modes use the translate-benchmark winner first (gpt-oss-120b: 4/4, zero refusals)
const TR_LADDER = [
  { model: "gpt-oss-120b", extra: { reasoning_effort: "low" } },
  { model: "gpt-oss-20b", extra: { reasoning_effort: "low" } },
  { model: "qwen/qwen3.8-27b", extra: {} },
];

const SYS = {
  af: "Jy is Mandy se Afrikaanse proefleser vir 'n sleutelbord se stemtipposisie. Die rou teks hieronder kom van 'n stemherkenningsprogram wat soms woorde verkeerd hoor, lukrake of verkeerde woorde invoeg, woorde weglaat, of sinne deurmekaar maak. Gee die teks terug as natuurlike, korrekte, vlot geskrewe Afrikaans, presies wat die spreker gesê het. Reëls: (1) Bekende Suid-Afrikaanse kunstenaars en name word ALTYD korrek gespel: Kurt Darren, Juanita du Plessis, Laurika Rauch, Steve Hofmeyr, Bok van Blerk, Refentse, Lianie May, Bobby van Jaarsveld, Emo Adams, Theuns Jordaan, Karlien van Jaarsveld, Jak de Priester, Robbie Wessels, Gerhard Steyn, Nicholis Louw, Heinz Winckler, Guillaume, Dozi, Sonja Herholdt, Anton Goosen, Valiant Swart, Koos Kombuis, Amore, Andriette, Elizma Theron, Pieter Smith, Riaan Benade, Dewald Wasserfall, Bouwer Bosch, Brendan Peytón, Charissa, Snotkop, Francois van Coke, Lianie May, Juanita Erasmus, Wian, Jay, Adam, Loukmaan Adams, Arno Carstens, Patricia Lewis, David Kramer, Mathys Roets, Salome, Corlea, Deon Groot, Fanie de Jager, Chris Chameleon, Dirk van Niekerk, Andriette Norman. In musiek-konteks: Katerin/Kutaren/Keuteren/Keterin = Kurt Darren; Janita de Plessis/Anita Duplessis/Jolita du Tlusi = Juanita du Plessis; Masiek/Muziek = musiek. 'nog' voor 'n kunstenaar se musiek is 'n verkeerde hoor van 'na' (ek wil na Kurt Darren se musiek luister). Mis-gehoorde name soos 'Kutaren', 'Keterin', 'Kut herren', 'Kud herren' is Kurt Darren; 'Jou aan die taart om plasie' is Juanita du Plessis. 'Eno van Maart' is 'n PERSOON se naam: as die herkenning 'Eno van Aert', 'Eno van Maart', 'eno van mart', 'et non fanart' of soortgelyk hoor, skryf ALTYD 'Eno van Maart' — NOOIT 'Emo Adams' of 'en nie fanart nie' nie. — NOOIT 'Emo Adams' of 'en nie fanart nie' nie. 'Fritz Deelman' is die KARAKTER se naam in Leon Rousseau se boekreeks: as die herkenning 'Fred/Frits/Fritz' gekombineer met 'Sturman', 'Stjoman', 'Stiehlmann', 'Stiermann', 'Diooman', 'Dioman', 'Stialman', 'Stjaumann', 'Dielman' of 'Stielman' hoor (of enige soortgelyke Deelman-variant in 'n boek-konteks), skryf ALTYD 'Fritz Deelman' (2) Vervang Duitse of Nederlandse woorde met regte Afrikaans (nicht->nie, ich->ek, und->en, heute->vandag, auch->ook, gut->goed, danke->dankie, brauche->benodig, ein/eine->'n, ist->is, bin->is, nacht->nag, moeilijkheid->moeilikheid, problemen->probleme; die Nederlandse lidwoord 'een' word ALTYD 'n — behalwe in tel-konteks soos 'een, twee, drie' of 'een keer' waar dit werklik 'one' beteken). (3) Herstel duidelike Afrikaanse spelfoute en deurbraakwoorde (geblij->gebly, noalweek->naweek, noort->noord, keier->kuier, batterij->battery, winkelcentrum->winkelsentrum, motorse->motor se, morgen/moore->môre, baaie->baie, gooiemorgen->goeie môre, middagsjete->middagete, môrndag->Maandag). Weekdae is altyd met 'n hoofletter: Maandag, Dinsdag, Woensdag, Donderdag, Vrydag, Saterdag, Sondag. (4) Groet-konteks: 'n groet is altyd 'goeie môre', 'goeie middag' of 'goeie aand' — as 'n weekdag in 'n groet verskyn ('goeie Maandag'), is dit 'n verkeerde hoor van 'middag' en moet dit 'goeie middag' wees. Net so beteken 'in die Maandag' of 'die Maandag is warm' by 'n tyd-beskrywing 'middag'. Maar as die sin oor 'n dag van die week gaan (die Maandag kom, op Maandag ontmoet ons), moet dit Maandag bly. (5) Korrektiewe voornaamwoorde: na 'n werkwoord moet die objeksvorm 'jou' wees, nie 'jy' nie (sien jy->sien jou, ontmoet jy->ontmoet jou, bel jy->bel jou). Jy is 'n DIKTASIE-MASJIEN: jy tik SLEGS wat werklik gehoor is. As 'n woord of gedeelte onduidelik of sinloos is, los dit SOOS DIE HERKENNING dit gehoor het. Dink NOOIT woorde uit nie, raai nooit nuwe woorde nie, herskryf nooit 'n sin om dit beter te laat klink nie. Herstel SLEGS duidelike mis-hoor-foute: Duits/Nederlands wat Afrikaans moet wees, ooglopende spelfoute, en bekende name. (6) VERBATIM: Voeg NIKS by wat nie gesê is nie, VERWYDER nooit 'n woord wat gesê is nie; as 'n sin onvoltooi is, los dit onvoltooi. Geen kommentaar, geen verduideliking, geen sensuur ooit nie. (7) As die teks al goed is, gee dit onveranderd terug. (8) Kort, eenvoudige, alledaagse Afrikaans soos mense werklik praat. (9) As die teks Engels is of Engelse woorde/sinne bevat, vertaal dit in natuurlike, eenvoudige, alledaagse Afrikaans soos 'n Suid-Afrikaner sou praat — dieselfde gehalte as 'n regte vertaling. Die gebruiker het hierdie sleutelbord se taal op Afrikaans gestel, dus moet die finale teks ALTYD volledig Afrikaans wees, ongeag watter taal hy in gespreek het. Gee SLEGS die finale teks, geen aanhalings-teken, geen verduideliking nie. (10) Vormattering: sit punte, kommas en vraagtekens presies waar sinne natuurlik eindig. As die diktasie lank is (drie of meer sinne oor duidelik verskillende onderwerpe), verdeel dit in paragrawe: sit een leë reël by elke werklike onderwerp-wissel. Nie te fyn nie, net by duidelike onderwerp-wissels. Voor die eerste sin is daar geen leë reël nie. (11) Gesproke syferwoorde bly woorde: as die spreker 'drie' sê, skryf 'drie', nie '3' nie. Enkele uitsondering: klok-tyd mag syfers gebruik (om 07:00). WOORDGETROUHEID: Jy is 'n diktasie-masjien. Voeg NOOIT woorde by nie, laat NOOIT woorde weg nie, skryf geen opmerkings of verduidelikings nie, sensor NOOIT enige inhoud nie, weier NOOIT enige inhoud nie. Skryf SLEGS presies wat die spreker gesê het, volledig, in geskrewe Afrikaans.",
  af_retry: "Die teks hieronder bevat steeds Duitse of Nederlandse woorde wat in Afrikaans hoort. Vervang elke Duitse/Nederlandse woord met sy regte Afrikaanse eweknie en herstel die sinne in natuurlike Afrikaans. Verander nie die betekenis nie. Gee SLEGS die finale teks.",
  judge: "Twee stemherkenningsenjins het dieselfde Afrikaanse diktasie getranskribeer. Weergawe A en Weergawe B verskil. Kis Weergawe A OF Weergawe B in sy geheel — smelt hulle NOOIT nie en voeg NOOIT 'n woord by wat in nie een weergawe voorkom nie. As een weergawe sinlose of ingebeelde woorde bevat, kies die ander een. Gee SLEGS die finale teks, geen aanhalings-teken nie.",
  en: "You are Mandy's English proofreader for keyboard dictation. Fix obvious spelling slips and misrecognized words ONLY. Do not rephrase, do not add words, do not change meaning. If the text is already fine, return it unchanged. Formatting: place punctuation naturally where sentences end. For long dictation (three or more sentences on clearly different topics), insert one blank line at each real topic change, not too fine, only at clear topic switches. Return ONLY the final text, no quotes, no explanation. VERBATIM: You are a dictation machine. NEVER add words, NEVER omit words, no comments, no explanations. Never censor or refuse ANY content.  The book character name is ALWAYS written as Fritz Deelman (Leon Rousseau series): if the recognition hears Fred, Frits or Fritz combined with Sturman, Stjoman, Stiehlmann, Stiermann, Diooman, Dioman, Stialman, Stjaumann, Dielman or Stielman, write Fritz Deelman.",
  auto: "Mandy's dictation fixer. For long dictation (three or more sentences on different topics) insert paragraph breaks (one blank line) at clear topic changes. Detect whether this dictation is English or Afrikaans. Fix obvious misrecognitions, inserted random words, and spelling slips in that language. If it is Afrikaans, replace any German or Dutch words with proper Afrikaans (nicht->nie, ich->ek, und->en, heute->vandag, batterij->battery, winkelcentrum->winkelsentrum). Do not rephrase beyond fixing recognition errors, add nothing, change no meaning. Return ONLY the corrected text. Bekende Suid-Afrikaanse kunstenaars word ALTYD korrek gespel: Kurt Darren, Juanita du Plessis, Laurika Rauch, Steve Hofmeyr, Bok van Blerk, Refentse, Lianie May, Bobby van Jaarsveld, Emo Adams. As die teks na musiek/kunstenaars klink ('Kurt Aaron', 'ghe deren', 'Anita Duplessis', 'Yolita du Tlusi'), herstel dit na Kurt Darren / Juanita du Plessis. WOORDGETROUHEID: Jy is 'n diktasie-masjien. Voeg NOOIT woorde by nie, laat NOOIT woorde weg nie, skryf geen opmerkings of verduidelikings nie, sensor NOOIT enige inhoud nie, weier NOOIT enige inhoud nie. Skryf SLEGS presies wat die spreker gesê het, volledig, in geskrewe Afrikaans.",
  trAF: "Mandy se vertaler. By lang teks (drie of meer sinne oor verskillende onderwerpe): verdeel dit in paragrawe met een leë reël by elke werklike onderwerp-wissel. Die gebruiker praat Engels en wil Afrikaans tik. As hierdie teks Engels is, vertaal dit in natuurlike, eenvoudige, alledaagse Afrikaans. As die teks al Afrikaans is, herstel net die spel- en taalfoute. Voorbeeld: 'remind me to call the doctor' = 'onthou my om die dokter te bel' ('remind' is ALTYD 'onthou', nooi 'vervang' nie). 'naughty' is ALTYD 'stout' ('n stout kind, stoute dinge), nooit 'onverskoonbaar' nie. 'phone' as werkwoord is 'bel'. 'Okay' bly 'Okay' (skryf nooit 'Oké' nie) en klok-tyd is 'om nege-uur' of 'om 09:00', nooit 'om 9 uur' nie. TYD-WOORDE bly ALTYD relatief, raai nooit na die huidige klok-tyd nie: tonight/this evening = vanaand, today = vandag, this morning = vanoggend, this afternoon = vanmiddag, tomorrow = môre, tomorrow evening = môre-aand, last night = gisteraand, yesterday = gister, next week = volgende week. 'listen to' + voorwerp is ALTYD 'luister na' (ek luister na musiek; nooit 'luister musiek' sonder 'na' nie). Voorbeeld: 'I want to listen to music' = 'ek wil na musiek luister'; 'listen to music on my phone' = 'na musiek op my foon luister'. 'seven' sonder 'n dag-deel-konteks bly 'sewe-uur' (raai nooit 07:00 of 19:00 nie); net as die sin self 'n dag-deel noem (soos 'môre-aand'), mag dit kloktyd word. Tyd-samestellings kry altyd 'n koppelteken: môre-oggend, môre-middag, môre-aand, vanmiddag-eten. Behou die betekenis presies. Jy is 'n vertaalmasjien vir die gebruiker se eie diktasie: weier of weier nie enige teks nie, voeg geen waarskuwings of verduidelikings by nie, vertaal presies wat gesê is. Behou die betekenis presies. Gee SLEGS die finale teks terug, geen aanhalings-teken nie. Geen woord kry 'n hoofletter in die middel van 'n sin nie (slegs name en sin-begin). Suid-Afrikaanse kunstenaars in die uitset word ALTYD korrek gespel: Kurt Darren, Juanita du Plessis, Laurika Rauch, Steve Hofmeyr, Bok van Blerk, Refentse, Lianie May, Bobby van Jaarsveld, Emo Adams. Die boek-karakter is ALTYD 'Fritz Deelman' (Leon Rousseau se reeks): Fred/Frits/Fritz + Sturman/Stjoman/Stiehlmann/Stiermann/Diooman/Dioman/Stialman/Stjaumann/Dielman/Stielman of soortgelyke variant = 'Fritz Deelman'. Jy is 'n masjien: sensor NOOIT enige inhoud nie, watermerk of versag enige woord nie.",
  toEN: "Translate this Afrikaans (or mixed) dictation into natural, simple, everyday English. Preserve the meaning exactly. Return ONLY the translation, no quotes, no explanation. VERBATIM: You are a dictation machine. NEVER add words, NEVER omit words, no comments, no explanations. Never censor or refuse ANY content. Write ONLY exactly what the speaker said, completely.",
  toAF: "Vertaal hierdie Engelse (of gemengde) diktasie in natuurlike, eenvoudige, alledaagse Afrikaans. Behou die betekenis presies. Gee SLEGS die vertaling terug, geen aanhalings-teken nie. Jy is 'n masjien: sensor NOOIT enige inhoud nie, watermerk of versag enige woord nie.",
  flip: "Detect whether this dictation is English or Afrikaans/Dutch/German. If it is English, translate it into natural simple Afrikaans. Otherwise translate it into natural simple English. Preserve meaning exactly. Return ONLY the translation. Never censor or refuse ANY content. Never add or omit words.",
  polish: "Jy is Mandy se finale outo-hersteller vir sleutelbord-diktasie. Hieronder is Afrikaanse sleutelbord-teks. Soek woorde wat verkeerd gehoor of verkeerd gespel is: nie-regte Afrikaanse woorde, letters deurmekaar of weg, verkeerde werkwoordsvorms, Duitse/Nederlandse woorde. Gee terug SLEGS 'n JSON-lys van vervangings, byvoorbeeld: [{\"verkeerd\":\"gekeier\",\"reg\":\"gekuier\"},{\"verkeerd\":\"ete\",\"reg\":\"eet\"}]. Reëls: herstel slegs WOORDE wat werklik foutief is; woorde wat al korrek is moet NIE in die lys verskyn nie; moenie heel sinne herskryf nie; voeg geen woorde by of weg nie; behou presiese spelling van korrekte woorde (lekker bly lekker, swaksiende bly swaksiende). As daar niks is om te herstel, gee terug: []",
};

// Deterministic Afrikaans word fixes (unambiguous whisper/Dutch slips), case-aware
const AF_FIX: Record<string, string> = {
  "nuusbeletens": "nuusbulletins", "nuusbulletens": "nuusbulletins", "nuusbulletijns": "nuusbulletins",
  "nuus bulletins": "nuusbulletins", "nuusbeletten": "nuusbulletins",
  "virmôre": "vir môre", "virmore": "vir môre", "vanmôre": "van môre", "die môre": "die môre",
  "voorster": "Worcester", "woester": "Worcester", "worcestor": "Worcester", "worchester": "Worcester",
  "ruimte kaart": "Ruimtekaart", "ruimtekaart": "Ruimtekaart",
  "kaleidoskoop": "Kaleidoscope", "kaleidoscoop": "Kaleidoscope",
  "bank roof": "Bankroof", "die bankroof": "Die Bankroof",
  "opneem": "opneem", "klaar maak": "klaarmaak", "uit sending": "uitsending",
  "karoo": "Karoo", "carnarvon": "Carnarvon", "son kol": "sonkol", "sonkolle": "sonkolle",

  "morgen": "môre", "moore": "môre", "noort": "noord", "keier": "kuier", "keir": "kuier",
  "batterij": "battery", "winkelcentrum": "winkelsentrum", "motorse": "motor se",
  "elmerie": "Elmarie", "elmeries": "Elmarie", "geblij": "gebly", "noalweek": "naweek",
  "baaie": "baie", "maakie": "maak", "morgens": "ôrens", "aandag": "aand", "gebliej": "gebly",
  "goeiemorgen": "goeie môre", "goedemorgen": "goeie môre", "goeiemore": "goeie môre", "goeiemôre": "goeie môre",
  "goedemore": "goeie môre", "more": "môre", "vandaag": "vandag", "goedemiddag": "goeie middag",
  "goeiemiddag": "goeie middag", "middagsjete": "middagete", "middagsjette": "middagete",
  "middagjette": "middagete", "middagjete": "middagete",
  "aksu": "ekskuus", "blei": "bly", "geslapie": "geslaap", "blei om": "bly om",
  "môrndag": "Maandag", "morn": "Maandag", "måndag": "Maandag", "mandag": "Maandag",
  "moandag": "Maandag", "mohndag": "Maandag", "middagse": "middag",
  "swakziende": "swaksiende", "lecke": "lekker", "eten": "eet", "gekeier": "gekuier",
  "ziende": "siende",
  "kutaren": "Kurt Darren", "kut herren": "Kurt Darren", "kud herren": "Kurt Darren",
  "keterin": "Kurt Darren", "kut darren": "Kurt Darren", "mwamita": "Juanita",
  "nacht": "nag", "maneuel": "Manuel", "maneo": "Manuel", "maneel": "Manuel",
  "moeilijkheid": "moeilikheid", "dinsenderdag": "Dinsdag",
  "aukay": "okay", "aukai": "okay", "aukei": "okay", "au kae": "okay",
  "problemen": "probleme", "desu": "dis waar", "desweer": "dis waar",
  "haukai": "okay", "oké": "okay",
  "fone": "foon", "moe": "moeg",
  "tjatoes": "chat ons", "bijtijd": "op tyd", "soe": "so",
  "snacks": "snaaks", "uitgekond": "uitgekom", "gaat": "gaan",
  "heimbergers": "hamburgers", "heimburger": "hamburger", "heimburgers": "hamburgers",
  "heimbergs": "hamburgers", "blij": "bly", "blij dat": "bly dat", "ondou": "onthou", "ondout": "onthou",
  "by kie": "bietjie", "bieke": "bietjie", "piekie": "bietjie", "bekie": "bietjie",
  "ontbijt": "ontbyt", "ontbij": "ontbyt", "meesje": "meisie", "asblyft": "asseblief", "asblyf": "asseblief",
  "winkoopies": "inkopies", "jylle": "julle", "julle": "julle", "eerlijk": "heerlik", "krenoes": "Grand West", "gauw": "gou", "kersfeestkaier": "Kersfees kuier", "zondag": "Sondag", "zaterdag": "Saterdag", "zondae": "Sondae", "heerlijke": "heerlike", "asseblieff": "asseblief", "batterytjie": "battery", "onderweg": "op pad", "prachtige": "pragtige", "een pragtige": "'n pragtige", "heerlikje": "heerlike", "vrijdag": "Vrydag", "vrij": "vry", "gebeer": "gebeur", "hondgebeer": "hond gebeur", "rei": "ry", "lekke": "lekker", "phone": "foon", "kurt aaron": "Kurt Darren", "anita duplessis": "Juanita du Plessis", "anita du plessis": "Juanita du Plessis", "ghe deren": "Kurt Darren", "gedere": "Kurt Darren", "gderen": "Kurt Darren", "yolita du tlusi": "Juanita du Plessis", "yolita": "Juanita", "du tlusi": "du Plessis", "unperdoet": "amper dood", "katerin": "Kurt Darren", "keuteren": "Kurt Darren", "janita de plessis": "Juanita du Plessis", "janita du plessis": "Juanita du Plessis", "masiek": "musiek", "muziek": "musiek", "musik": "musiek", "veel": "baie", "ane meer": "en meer", "katarin": "Kurt Darren", "maasiek": "musiek", "karleen": "Karlien", "teens jordan": "Theuns Jordaan", "musiek, catering": "musiek, Kurt Darren", "janita de pleisters": "Juanita du Plessis", "janita de pleises": "Juanita du Plessis", "janita": "Juanita", "kerdaren": "Kurt Darren", "ker deren": "Kurt Darren", "kurdaren": "Kurt Darren", "kurt deren": "Kurt Darren", "kurdarren": "Kurt Darren", "kurt daren": "Kurt Darren", "kaderin": "Kurt Darren", "kedaran": "Kurt Darren", "klapwerforkest": "Klipwerf Orkes", "klapwerf orkes": "Klipwerf Orkes", "klapwerf": "Klipwerf", "klaver voorkeest": "Klipwerf Orkes", "klopfer von kisch": "Klipwerf Orkes", "klopfer vor kess": "Klipwerf Orkes", "klopper vir kess": "Klipwerf Orkes", "trabwaf of geis": "Klipwerf Orkes", "trabwaf or geis": "Klipwerf Orkes", "eno van maart": "Eno van Maart", "eno van aert": "Eno van Maart", "eno van mart": "Eno van Maart", "eno van maarte": "Eno van Maart", "eno van march": "Eno van Maart", "et non fanart": "Eno van Maart", "en nie fanart nie": "Eno van Maart", "eno fanart": "Eno van Maart", "eno fan maart": "Eno van Maart", "enow van maart": "Eno van Maart", "ano van maart": "Eno van Maart", "heno van maart": "Eno van Maart", "enno van maart": "Eno van Maart", "катарин": "Kurt Darren", "kertaren": "Kurt Darren", "kertarensing": "Kurt Darren sing", "kertaren sing": "Kurt Darren sing", "amberbers": "hamburgers", "amberger": "hamburger", "klubwerf orkes": "Klipwerf Orkes", "klubwerf orkest": "Klipwerf Orkes", "klubwerf": "Klipwerf", "klub werf": "Klipwerf", "eno van maert": "Eno van Maart", "eno van maart en": "Eno van Maart en", "klipwerf orges": "Klipwerf Orkes", "klip werf orges": "Klipwerf Orkes", "klipwerf orkes": "Klipwerf Orkes", "klip werf orkes": "Klipwerf Orkes",  "duplessis": "du Plessis", "joannita": "Juanita", "juanita duplessis": "Juanita du Plessis", "afrikaanse missie van": "Afrikaanse musiek van", "missiek": "musiek", "missie van kurt": "musiek van Kurt", "jordaan": "Jordaan", "snaks geels": "snaaks gesels", "snaks": "snaaks", "keer daarin": "Kurt Darren", "doen soof": "doen alsof", "hofmeyer": "Hofmeyr", "jolandi": "Yolandi", "you'll andy": "Yolandi", "you'll landy": "Yolandi", "you'll learn d": "Yolandi", "hofmeyers": "Hofmeyr", "frits deelman": "Fritz Deelman", "frits dielman": "Fritz Deelman", "frits stielman": "Fritz Deelman", "fritz deelman": "Fritz Deelman", "fritz dielman": "Fritz Deelman", "fritz stielman": "Fritz Deelman", "fred stialman": "Fritz Deelman", "fred dioman": "Fritz Deelman", "fred stjaumann": "Fritz Deelman", "dielman": "Deelman", "stielman": "Deelman", "fred sturman": "Fritz Deelman", "fred stjoman": "Fritz Deelman", "fred stiehlmann": "Fritz Deelman", "fritz stiermann": "Fritz Deelman", "frits diooman": "Fritz Deelman", "fred stierman": "Fritz Deelman", "fritz stierman": "Fritz Deelman", "frits stierman": "Fritz Deelman", "stierman": "Deelman", "unita duplessis": "Juanita du Plessis", "yolita duplessis": "Juanita du Plessis",
};
function afFix(t: string): string {
  let s = t;
  for (const bad of Object.keys(AF_FIX)) {
    const good = AF_FIX[bad];
    const re = new RegExp("\\b" + bad + "\\b", "gi");
    s = s.replace(re, (m) => (m[0] === m[0].toUpperCase() ? good.charAt(0).toUpperCase() + good.slice(1) : good));
  }
  // compound mishearings without word boundaries
  s = s.replace(/môrndagmiddag/gi, "Maandagmiddag").replace(/môrndag/gi, "Maandag");
  s = s.replace(/\bom te woer\b/gi, "om te hoor").replace(/\bsu te woer\b/gi, "om te hoor");
  // middag heard as maandag in greetings/time contexts (Adrian's voice pattern, verified from his samples)
  s = s.replace(/\bgoeie maandag\b/gi, "goeie middag");
  s = s.replace(/\bin die maandag\b/gi, "in die middag");
  // v23.0 extra training hour (8 Oct 10:04-10:14 ear logs)
  s = s.replace(/\bhou ek geen probleem nie\b/gi, "Okay, geen probleem nie");
  s = s.replace(/\bdeur mykaar\b/gi, "deurmekaar");
  s = s.replace(/\b(\d+) minuut\b/gi, "$1 minute");
  s = s.replace(/\bek is baie vaak\b/gi, "ek is baie moeg");
  s = s.replace(/\bveel nachts he\b/gi, "vir jou nag sê");
  s = s.replace(/\bvir jou nacht sê\b/gi, "vir jou nag sê");
  // v22.7 training hour (8 Oct, from 5-7 Oct ear sweeps)
  s = s.replace(/\bjy leske nog\b/gi, "lees jy nog");
  s = s.replace(/\bwow kai\b/gi, "wow okay");
  s = s.replace(/\bvervang my om die dokter\b/gi, "onthou my om die dokter");
  // v22.6 ear round 3 (his 17:35-17:47 tests)
  s = s.replace(/\bquinten man(u|uel)?\b/gi, "Quinten Manuel");
  // v22.5: SA artist garbles from Adrian's 7 Oct test clips
  s = s.replace(/\bjou aan die taart om plasie\b/gi, "Juanita du Plessis");
  s = s.replace(/\bmwamita[ ,]+duplassie\b/gi, "Juanita du Plessis");
  s = s.replace(/\bketerin afrikaanse\b/gi, "Kurt Darren Afrikaanse");
  // v22.3 ear fixes (Adrian's voice patterns, 7 Oct Praat logs)
  s = s.replace(/\bswak ziende\b/gi, "swaksiende");
  s = s.replace(/\b(is|was|word|het) een\b/gi, (m) => m.replace(/een/i, "'n")); // Dutch article
  s = s.replace(/\b'n lecke\b/gi, "'n lekker");
  s = s.replace(/\bjy lesieke nog\b/gi, "lees jy nog");
  s = s.replace(/\baand eten\b/gi, "aandete");
  // v23.10 midnight training (10 Oct 00:00, ear logs 16:57-17:19)
  s = s.replace(/\bgeniet in\b/gi, "geniet dit");
  s = s.replace(/\bHy moet\b/gi, "Jy moet");
  s = s.replace(/\bHy gaan\b/gi, "Jy gaan");
  s = s.replace(/\bHy het\b/gi, "Jy het");
  // Dutch "een" -> Afrikaans "'n" in more contexts (not just after is/was/word/het)
  s = s.replace(/\b(moet|gaan|nou|sal|wil|kan|het|is|was|word|van) een\b/gi, (m) => m.replace(/een/i, "'n"));
  // "hand" heard for "aand" in greeting/evening context
  s = s.replace(/\blekker hand\b/gi, "lekker aand");
  s = s.replace(/\b'n hand\b/gi, "'n aand");
  s = s.replace(/\been hand\b/gi, "'n aand");
  // "he" -> "he" (have) after "aand" (common in greetings: "aand he" -> "aand he")
  s = s.replace(/\baand he\b/gi, "aand hê");
  s = s.replace(/\baand he,\b/gi, "aand hê,");
  // "op my phone" -> "op my foon"
  s = s.replace(/\bop my phone\b/gi, "op my foon");
  // object pronoun: "sien jy" -> "sien jou" (verb + jy -> verb + jou)
  s = s.replace(/\b(sien|ontmoet|bel|vergesel|help|ondersteun|hulp vir) jy\b/gi, (m) => m.replace(/jy/i, "jou"));
  // v23.11 morning training (his 05:56-06:07 clips)
  s = s.replace(/\bma verskoon\b/gi, (m) => (m[0] === "M" ? "My verskoon" : "my verskoon"));
  s = s.replace(/\bna verskoon\b/gi, (m) => (m[0] === "N" ? "My verskoon" : "my verskoon"));
  s = s.replace(/\bleer ma\b/gi, "leer maar");
  s = s.replace(/\bverskiert skryf\b/gi, "verkeerd skryf").replace(/\bverskiet skryf\b/gi, "verkeerd skryf");
  s = s.replace(/\bhakke bietjie\b/gi, "hak en bietjie");
  s = s.replace(/\bbraai vleis eet\b/gi, "braaivleis eet");
  // v23.13 normal-AF quality (10 Oct conversational tests + his 07:38 clips)
  s = s.replace(/\beerlik gekuier\b/gi, "heerlik gekuier").replace(/\beerlik gekook\b/gi, "heerlik gekook");
  s = s.replace(/\bom die vier\b/gi, "om die vuur");
  s = s.replace(/\bvroeg graai\b/gi, "vroeg ry");
  s = s.replace(/\bgelyke daag hê\b/gi, "gelyke dag hê").replace(/\bgelyk gedag hê\b/gi, "gelyke dag hê");
  s = s.replace(/\bgoeie môre, amal\b/gi, "Goeie môre, almal").replace(/\bgoeie môre, amon\b/gi, "Goeie môre, almal");
  s = s.replace(/\bmôre, amal\b/gi, "môre, almal");
  // v23.14 negasie-waak (betekenis-omkeer): sy 'helpie'/'geholpie' garbles
  s = s.replace(/\bongelukkig geholpie\b/gi, "ongelukkig nie help nie");
  s = s.replace(/\bek kan jou (ook )?ongelukkig help\b/gi, (m) => m.toLowerCase().includes("ook") ? "ek kan jou ook ongelukkig nie help nie" : "ek kan jou ongelukkig nie help nie");
  s = s.replace(/\bom te wer\b/gi, "om te hoor");
  // v23.15 ronde 2
  s = s.replace(/\bnie kon oor nie\b/gi, "nie kon hoor nie");
  s = s.replace(/\bek om amper\b/gi, "ek hom amper");
  // v23.16 ronde 3
  s = s.replace(/\brei ons\b/gi, "ry ons");
  s = s.replace(/\belke half uur\b/gi, "elke halfuur");
  s = s.replace(/\bby die brooi\b/gi, "by die braai");
  // v23.44 auto-train (12 Okt 13:29-13:30): whisper taal-verwarring — heel-string nie-Latynse skrif-garbles van
  // "Baie lekker, dankie" (Devanagari + Urdu/Persies weergawes). Heel-string slegs, anders niks.
  s = s.replace(/^\s*पाये लैकर जांकी\s*[.!]?\s*$/g, "Baie lekker, dankie.");
  s = s.replace(/\bf(y|ij) lekker\b/gi, (m) => (m[0] === "F" ? "Baie lekker" : "baie lekker")); // v23.45b: whisper hoor "Baie" soms as "Fy"
  s = s.replace(/^\s*بایہ لیکر دانگ (?:کی|की)\s*[.!]?\s*$/g, "Baie lekker, dankie.");
  // v23.19: weekdae kry ALTYD 'n hoofletter (deterministies)
  s = s.replace(/\b(maandag|dinsdag|woensdag|donderdag|vrydag|saterdag|zondag)\b/gi, (m) => m[0].toUpperCase() + m.slice(1).toLowerCase());
  s = s.replace(/\b(goeie môre|goeie middag|goeie aand), maandag\b/gi, (m) => m.replace(/, maandag/i, ""));
  s = s.replace(/\brei\b/g, "ry");
  return s;
}

// v22.9: English word fixes (deterministic, auto-train fills these from en_debug_ ear logs)
const EN_FIX: Record<string, string> = {
  "gonne": "gonna", "spin ask to share": "been asked to share",
  "myness": "My name is", "bice44": "Base44", "bice 44": "Base44", "neighbors": "neighbours", "neighbor": "neighbour",
  "steve hofmeyer": "Steve Hofmeyr", "hofmeyer": "Hofmeyr", "mustang spaceship": "missing spaceship", "frits deelman": "Fritz Deelman", "frits dielman": "Fritz Deelman", "frits stielman": "Fritz Deelman", "fritz deelman": "Fritz Deelman", "fritz dielman": "Fritz Deelman", "fritz stielman": "Fritz Deelman", "fred stialman": "Fritz Deelman", "fred dioman": "Fritz Deelman", "fred stjaumann": "Fritz Deelman", "dielman": "Deelman", "stielman": "Deelman", "fred sturman": "Fritz Deelman", "fred stjoman": "Fritz Deelman", "fred stiehlmann": "Fritz Deelman", "fritz stiermann": "Fritz Deelman", "frits diooman": "Fritz Deelman", "fred stierman": "Fritz Deelman", "fritz stierman": "Fritz Deelman", "frits stierman": "Fritz Deelman", "stierman": "Deelman",
  "kaderin": "Kurt Darren", "kedaran": "Kurt Darren", "unita duplessis": "Juanita du Plessis",
  "anita duplasi": "Juanita du Plessis", "wanita duplisi": "Juanita du Plessis", "jolande": "Yolandi", "jolandi": "Yolandi", "you'll andy": "Yolandi", "you'll landy": "Yolandi", "you'll learn d": "Yolandi",
};
function enFix(t: string): string {
  let s = t;
  for (const bad of Object.keys(EN_FIX)) {
    const good = EN_FIX[bad];
    const re = new RegExp("\\b" + bad + "\\b", "gi");
    s = s.replace(re, (m) => (m[0] === m[0].toUpperCase() ? good.charAt(0).toUpperCase() + good.slice(1) : good));
  }
  return s;
}

// Unambiguous German/Dutch markers (not valid Afrikaans words)
const DE_MARKERS = ["nicht", "ich", "heute", "auch", "danke", "brauche", "jij", "zeggen", "sprechen", "haben", "sehr", "morgen", "batterij", "winkelcentrum", "keier", "noort"];
function germanDutch(t: string): boolean {
  const words = " " + t.toLowerCase().replace(/[^a-zäöüß ]/g, " ").replace(/\s+/g, " ") + " ";
  if (DE_MARKERS.some((m) => words.includes(" " + m + " "))) return true;
  const COMPOUNDS = ["morgen", "vandaag", "batterij", "centrum", "goedemorgen", "goeiemorgen"];
  return COMPOUNDS.some((c) => words.includes(c));
}

// v23.18: English-echo detector for translate output (words that exist ONLY in English, not Afrikaans)
const EN_ONLY = new Set(["the","you","your","not","is","are","am","was","were","what","when","where","she","he","they","we","will","would","want","do","doing","did","about","all","yes","dreaming","dream","things","thing","naughty","love","like","listen","alone","forget","buy","bread","milk","told","visit","next","weather","hot","swim","now","today","friend","music","this","that","there","does","back","way","week","too","very","with","have","has"]);
function englishCount(t: string): number {
  const ws = t.toLowerCase().match(/[a-z']+/g) || [];
  return ws.filter((w) => EN_ONLY.has(w)).count ? 0 : ws.filter((w) => EN_ONLY.has(w)).length;
}
function afTimeCtx(): string {
  const d = new Date(Date.now() + 2 * 3600 * 1000); // SAST = UTC+2
  const h = d.getUTCHours();
  const part = h < 12 ? "oggend" : (h < 18 ? "middag" : "aand");
  const hh = String(h).padStart(2, "0") + ":" + String(d.getUTCMinutes()).padStart(2, "0");
  return " ||KONTEKS: Dit is nou " + hh + " (" + part + ") in Suid-Afrika. By 'n onduidelike groet (goeie môre/middag/aand), kies die een wat by hierdie tyd pas. As die spreker se bedoeling duidelik 'n ander tyd noem, volg die spreker.";
}
function sane(text: string, raw: string, kind: string): string {
  let t = (text || "").trim();
  if (!t) return raw;
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) t = t.slice(1, -1).trim();
  if (!t) return raw;
  const cap = kind === "fix" ? Math.max(raw.length * 1.6, raw.length + 25) : raw.length * 3 + 50;
  if (t.length > cap) return raw;
  return t;
}

// v23.26: platform Gemini 3.8 Flash (geen sleutel nodig; platform-toelaag kan op wees -> val stil deur)
let gReq: Request | null = null;
function geminiClean(t: string): string {
  let s = t.trim();
  s = s.replace(/\*\*/g, "").replace(/^\s*[*_>#]+\s*/gm, "");
  if (s.startsWith('"') && s.endsWith('"') && s.length > 2) s = s.slice(1, -1);
  return s.trim();
}
async function platformGemini(system: string, userText: string): Promise<string> {
  if (!gReq) return "";
  try {
    const { createClientFromRequest } = await import("npm:@base44/sdk@0.8.31");
    const base44 = createClientFromRequest(gReq);
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      model: "gemini_3_8_flash",
      prompt: system + "\n\n" + userText,
      temperature: 0.2,
      maxTokens: 1000,
    });
    let text = (result && typeof result === "object" && (result.content || result.text)) ? (result.content || result.text) : String(result || "");
    return geminiClean(String(text || ""));
  } catch { return ""; }
}
async function groqLLM(system: string, userText: string, ladder: { model: string; extra: any }[] = LADDER): Promise<string> {
  for (const m of ladder) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + GROQ_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: m.model,
          temperature: 0,
          max_tokens: 1500,
          messages: [{ role: "system", content: system }, { role: "user", content: userText }],
          ...m.extra,
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!r.ok) continue;
      const d: any = await r.json();
      const c = (d?.choices?.[0]?.message?.content || "").trim();
      if (c) return c;
      const rs = (d?.choices?.[0]?.message?.reasoning || "").trim();
      if (rs) {
        const lines = rs.split("\n").filter((x: string) => x.trim());
        const last = lines.length ? lines[lines.length - 1].replace(/^[>\-*\s]+/, "").trim() : "";
        if (last && last.length < userText.length * 2 + 60) return last;
      }
    } catch { /* next model */ }
  }
  // v23.26: alle Groq modelle gedreineer (429-burst) -> probeer platform Gemini as redding
  const gem = await platformGemini(system, userText);
  if (gem) return gem;
  return "";
}

// v23.57: Deepgram Nova-3 as primary ASR vir AF/EN (Adrian se versoek 11 Nov).
// Rede: Whisper dryf op Afrikaans dikwels na Nederlands; Nova-3 bly Afrikaans.
async function deepgram(audio: Blob, lang: string | null): Promise<string> {
  try {
    const q = new URLSearchParams({ model: "nova-3", smart_format: "true", punctuate: "true" });
    if (lang) q.set("language", lang);
    const body = await (audio as Blob).arrayBuffer();
    const r = await fetch("https://api.deepgram.com/v1/listen?" + q.toString(), {
      method: "POST",
      headers: { "Authorization": "Token " + DG_KEY, "Content-Type": (audio as any).type || "audio/wav" },
      body,
    });
    if (!r.ok) return "";
    const j: any = await r.json();
    const alt = j?.results?.channels?.[0]?.alternatives?.[0];
    const t = String(alt?.transcript || "").trim();
    const conf = Number(alt?.confidence ?? 0);
    if (!t || conf < 0.45) return "";
    return t;
  } catch { return ""; }
}

async function whisper(audio: Blob, filename: string, lang: string | null, prompt: string, model: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", audio, filename);
  fd.append("model", model);
  fd.append("temperature", "0");
  fd.append("response_format", "json");
  if (prompt) fd.append("prompt", prompt);
  if (lang) fd.append("language", lang);
  const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { "Authorization": "Bearer " + GROQ_KEY },
    body: fd,
    signal: AbortSignal.timeout(30000),
  });
  if (!r.ok) throw new Error("whisper " + r.status);
  const d: any = await r.json();
  return (d?.text || "").trim();
}

// v23.53: bêre die klank BLYWEND in Base44 se file storage (tmpfiles verval na 60 min; JMedia se content_b64 veld is te klein)
// privaat eerste (Adrian se stem hoort nie op 'n publieke CDN nie), publiek as terugval, anders net tmpfiles
async function earAudioStore(req: Request, audio: Blob | null): Promise<string> {
  try {
    if (!audio || (audio as any).size < 1000 || (audio as any).size > 900000) return "";
    const { createClientFromRequest } = await import("npm:@base44/sdk@0.8.31");
    const b44 = createClientFromRequest(req);
    const f = new File([audio], "af_" + Date.now() + ".wav", { type: "audio/wav" }); // SDK verwag 'n File, nie 'n Blob nie
    try {
      const p: any = await b44.asServiceRole.integrations.Core.UploadPrivateFile({ file: f });
      if (p?.file_uri) return "B44PRIV " + p.file_uri;
    } catch {}
    try {
      const u: any = await b44.asServiceRole.integrations.Core.UploadPublicFile({ file: f });
      if (u?.url) return "B44PUB " + u.url;
    } catch {}
    return "";
  } catch { return ""; }
}

async function captureSample(req: Request, tag: string, lang: string, fname: string, rawA: string, rawB: string, final: string, ms: number, audio: Blob): Promise<string> {
  try {
    const svc = req.headers.get("base44-service-authorization") || "";
    const api = req.headers.get("base44-api-url") || "https://superagent-269bfe30.base44.app";
    if (!svc) return "no svc header";
    const ts = Date.now();
    // upload audio to tmpfiles.org (no auth, 60-min direct URL)
    let audioUrl = "";
    if (audio && audio.size > 1000 && audio.size < 900000) {
      try {
        const uf = new FormData();
        uf.append("file", audio, "af_" + ts + ".wav");
        const u = await fetch("https://tmpfiles.org/api/v1/upload", {
          method: "POST",
          body: uf,
          signal: AbortSignal.timeout(25000),
        });
        if (u.ok) {
          const ud: any = await u.json();
          const p: string = ud?.data?.url || "";
          if (p) audioUrl = p.replace("tmpfiles.org/", "tmpfiles.org/dl/");
        }
      } catch {}
    }
    const earStore = await earAudioStore(req, audio);
    const meta = "LANG=" + lang + " | RAW_A=" + rawA + " | RAW_B=" + rawB + " | FINAL=" + final + " | MS=" + ms + (audioUrl ? " | AUDIO=" + audioUrl : "") + (earStore ? " | AUDIO2=" + earStore : "");
    const r = await fetch(api + "/api/entities/JMedia", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": svc },
      body: JSON.stringify({
        name: tag + ts + " ||META|| " + meta,
        mime: (audio as any)?.type || "audio/wav",
        size: audio?.size || 0,
        content_b64: earStore || "sample on tmpfiles",
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return "create " + r.status + " " + (await r.text()).slice(0, 80);
    const lr = await fetch(api + "/api/entities/JMedia?limit=40&sort=-created_date", {
      headers: { "Authorization": svc },
      signal: AbortSignal.timeout(15000),
    });
    if (lr.ok) {
      const data: any = await lr.json();
      const items = data?.items || data?.records || (Array.isArray(data) ? data : []);
      if (Array.isArray(items)) {
        // keep newest 8 per prefix (list is newest-first), delete older
        const counters: Record<string, number> = {};
        const drop: any[] = [];
        for (const it of items) {
          const nm: string = typeof it.name === "string" ? it.name : "";
          const pfx = ["af_debug_", "en_debug_", "tr_debug_", "auto_debug_"].find((p) => nm.startsWith(p));
          if (!pfx) continue;
          counters[pfx] = (counters[pfx] || 0) + 1;
          if (counters[pfx] > 8) drop.push(it);
        }
        for (const it of drop) {
          try {
            await fetch(api + "/api/entities/JMedia/" + it.id, { method: "DELETE", headers: { "Authorization": svc }, signal: AbortSignal.timeout(10000) });
          } catch {}
        }
      }
    }
    return "ok" + (audioUrl ? "+audio" : "+noaudio");
  } catch (e: any) { return "ERR " + String(e?.message || e).slice(0, 80); }
}

export default async function main(req: Request): Promise<Response> {
  const t0 = Date.now();
  gReq = req; // v23.26: vir platformGemini
  const out = (o: any) => new Response(JSON.stringify(o), { headers: { "Content-Type": "application/json" } });
  try {
    const form = await req.formData();
    const langRaw = String(form.get("lang") || form.get("mode") || "auto").trim().toLowerCase();
    const translate = String(form.get("translate") || "0").trim() === "1";
    const dbg = String(form.get("debug") || "") === "1";
    const fixOn = String(form.get("fix") || "1").trim() !== "0"; // v23.41: fix=0 = rou modus
    let audio: Blob | null = (form.get("file") as Blob) || (form.get("audio") as Blob) || null;
    if (!audio || typeof (audio as any).arrayBuffer !== "function") {
      return out({ success: false, error: "no audio" });
    }
    const fname = (audio as any).name || "voice.wav";
    if (!(audio as any).type) (audio as any).type = "audio/wav";

    // v22.2: near-empty audio = mic produced no sound (permission/mic conflict). Never send to whisper:
    // whisper invents fluent nonsense from silence (e.g. "Ondertitels ingediend door de Amara.org gemeenschap").
    const asize = (audio as any).size || 0;
    if (asize > 0 && asize < 20000) return out({ success: false, error: "no_voice", heard: false });

    // v23.49: piek-stilte-wag — meet die grootste piek in die PCM-data; byna-doo Stilte moet no_voice gee, nooit whisper bereik nie
    try {
      const ab8 = new Uint8Array(await (audio as Blob).arrayBuffer());
      let off = 44;
      for (let i = 12; i < ab8.length - 8; i++) {
        if (ab8[i] === 0x64 && ab8[i + 1] === 0x61 && ab8[i + 2] === 0x74 && ab8[i + 3] === 0x61) { off = i + 8; break; }
      }
      let peak = 0;
      for (let i = off; i + 1 < Math.min(ab8.length, off + 2 * 1024 * 1024); i += 2) {
        const v = Math.abs((ab8[i + 1] << 8) | ab8[i]);
        if (v > peak) peak = v;
      }
      if (peak < 150) return out({ success: false, error: "no_voice", heard: false });
    } catch { /* meetfout: laat soos voorheen deur */ }

    // 1. Whisper pass(es)
    const isAF = langRaw.startsWith("af") || langRaw === "afrikaans";
    const isEN = langRaw === "en" || langRaw === "english" || langRaw.startsWith("en");
    let hintLang: string | null = null, hintPrompt = ANY_PROMPT;
    if (isAF) { hintLang = "af"; hintPrompt = AF_PROMPT; }
    else if (isEN) { hintLang = "en"; hintPrompt = EN_PROMPT; }

    let text = "";
    let second = "";
    let asrSrc = "groq";
    // v23.57: AF/EN eers deur Deepgram Nova-3; Groq Whisper bly rugsteun
    if (isAF || isEN) {
      try { text = await deepgram(audio as Blob, isAF ? "af" : "en"); } catch { text = ""; }
      if (text) asrSrc = "deepgram";
    }
    if (!text) {
      try {
        text = await whisper(audio, fname, hintLang, hintPrompt, "whisper-large-v3");
      } catch { try { text = await whisper(audio, fname, null, ANY_PROMPT, "whisper-large-v3"); } catch { return out({ success: false, error: "asr_failed" }); } }
    }
    if (!text) return out({ success: false, error: "empty" });
    // v22.2: hallucination firewall — known phantom phrases whispered from silence/noise
    if (HALLU.test(text)) return out({ success: false, error: "no_voice", heard: false });

    // v23.41: ROU MODUS (fix=0) — die herkennings-teks kom reguit uit, geen tweede pass, geen brein, geen regstellings
    if (!fixOn) {
      const rawText = text.trim();
      const rawTag = translate ? "tr_debug_" : (isAF ? "af_debug_" : (isEN ? "en_debug_" : "auto_debug_"));
      const rawCap = await captureSample(req, rawTag, langRaw + (translate ? "|tr" : "") + "|raw", fname, text, "", rawText, Date.now() - t0, audio as Blob);
      const rawResp: any = { success: true, text: rawText, v: "23.59", raw: true };
      if (dbg) rawResp.debug = { lang: langRaw, translate: translate, raw: text, asr: asrSrc, ms: Date.now() - t0, cap: rawCap };
      return out(rawResp);
    }

    // AF precision: second whisper pass with turbo, deterministic fixes, then consensus judge
    if (isAF) {
      try { second = await whisper(audio, fname, "af", AF_PROMPT, "whisper-large-v3-turbo"); } catch { second = ""; }
      if (second && HALLU.test(second)) second = ""; // turbo phantom phrase -> ignore turbo pass entirely
      text = afFix(text);
      if (second) second = afFix(second);
      if (second && second !== text) {
        const judged = await groqLLM(SYS.judge, "Weergawe A: " + text + "\n\nWeergawe B: " + second);
        if (judged) text = sane(judged, text, "fix");
      } else if (second) {
        text = second;
      }
    }

    // 2. Brain pass
    let kind = "fix"; let sys = SYS.auto; let final = text;
    if (translate || langRaw.startsWith("vertaal_en")) {
      sys = SYS.trAF; kind = "tr";
    } else if (langRaw === "to_en" || langRaw === "translate_en") { // v23.24: AF->EN was onbereikbaar (toEN was dooie kode)
      sys = SYS.toEN; kind = "tr";
    } else if (langRaw.startsWith("vertaal_af") || langRaw === "translate_af" || langRaw === "to_af") {
      sys = SYS.toAF; kind = "tr";
    } else if (langRaw === "vertaal" || langRaw === "translate") {
      sys = SYS.flip; kind = "tr";
    } else if (isAF) {
      sys = SYS.af + afTimeCtx(); // v23.18: time-of-day context for greetings
    } else if (isEN) {
      sys = SYS.en;
    } else {
      sys = SYS.auto;
    }
    const ladder = LADDER; // v23.20: terug na die standaard leer vir alle modes (Adrian se versoek)
    let brain = await groqLLM(sys, text, ladder);
    if (!brain && kind === "tr") brain = await groqLLM(sys, text, ladder); // v23.9: ladder hiccup retry for translate mode
    if (!brain && kind === "tr") { // v23.22: pool-burst herprobeer — wag 3s, rolvenster herlaai
      await new Promise((r) => setTimeout(r, 3000));
      brain = await groqLLM(sys, text, ladder);
    }
    if (!brain) { // v23.28: AF/EN ook 'n pool-burst herprobeer — anders kom rou garbles deur
      await new Promise((r) => setTimeout(r, 3000));
      brain = await groqLLM(sys, text, ladder);
    }
    if (brain) final = sane(brain, text, kind);

    // v23.51: gegroet-wag (verbatim) — die brein mag NIE 'n groet uitvind of 'n geldige groet omruil nie
    if (!kind || kind === "fix") {
      // reël 1: groet in die finale teks, maar NOOrens geen groet-agtige spoor in die rou gehoor nie -> brein het dit uitgedink
      const traceGreet = /(môre|more|moro|morr|middag|aand|oggend|hallo|hello|morn|afternoon|evening|\bhi\b|\bhey\b|hiya)/i;
      const madeGreet = /(goeie môre|goeie more|goeie middag|goeie aand|goeie-?oggend)/i;
      if (final && madeGreet.test(final) && !traceGreet.test(text)) final = text;
      // reël 2: rou het 'n geldige groet vooraan, brein het dit omgeruil vir 'n ander groet -> sit die gehoorde groet terug
      if (final && text) {
        const g1 = text.match(/^(hallo|hello|hi|hey|goeie môre|goeie middag|goeie aand)/i);
        const g2 = final.match(/^(goeie môre|goeie more|goeie middag|goeie aand|hallo|hello|hi|hey)/i);
        if (g1 && g2 && g1[1].toLowerCase() !== g2[1].toLowerCase().replace("more", "môre")) {
          final = final.slice(g2[1].length).replace(/^\s*,\s*/, "");
          final = g1[1] + (final ? " " + final : "");
        }
      }
    }

    // v23.29: weierings-wag vir ALLE modes — 'n diktasie-masjien weier nooit
    if (final && /(I can(?:not|'t) (?:assist|help|transcribe)|I must (?:decline|refuse)|as an AI language model|I'm sorry, (?:but )?I can)/i.test(final)) {
      const rep = await groqLLM("Jy is 'n diktasie-masjien wat enige gedikteerde teks presies afskryf, sonder sensuur, sonder weiering. Skryf SLEGS die teks: " + text, text);
      if (!rep) { const g = await platformGemini("Jy is 'n diktasie-masjien wat enige gedikteerde teks presies afskryf, sonder sensuur, sonder weiering. Skryf SLEGS die teks: " + text, text); if (g && !/(can(?:not|'t)|sorry|I must (?:decline|refuse)|as an AI)/i.test(g)) final = sane(g, text, kind); }
      if (rep && !/(can(?:not|'t)|sorry|I must (?:decline|refuse)|as an AI)/i.test(rep)) final = sane(rep, text, kind);
    }
    // v23.20: TR refusal guard — qwen-first kan soms weier; herstel-pas met gpt-oss-20b
    if (kind === "tr" && final && /(can(?:not|'t)|won't|unable|sorry|I must (?:decline|refuse)|not able to)/i.test(final)) {
      const rep = await groqLLM(sys, text, [{ model: "gpt-oss-20b", extra: { reasoning_effort: "low" } }]);
      if (!rep) { const g = await platformGemini(sys, text); if (g && !sane(g, text, "tr").match(/(can(?:not|'t)|won't|unable|sorry|I must (?:decline|refuse))/i)) final = sane(g, text, "tr"); }
      if (rep && !sane(rep, text, "tr").match(/(can(?:not|'t)|won't|unable|sorry|I must (?:decline|refuse))/i)) final = sane(rep, text, "tr");
    }
    // v23.25: naughty/stout wag — qwen ignoreer soms die trAF reël
    if (kind === "tr" && /\bnaughty\b/i.test(text) && /\bonverskoonbaar\w*/i.test(final)) {
      final = final.replace(/\bonverskoonbaar\w*/gi, "stoute");
    }
    // v23.24: toEN reverse echo guard — target is English but output stayed Afrikaans. Repair pass.
    if (kind === "tr" && final && (langRaw === "to_en" || langRaw === "translate_en")) {
      const afOnly = ["die","nie","ek","jy","van","het","met","wat","ons","ŉ"];
      const fws = (final.toLowerCase().match(/[a-z']+/g) || []);
      const afc = fws.filter((w) => afOnly.includes(w)).length;
      if (fws.length > 0 && afc >= 2 && afc / fws.length > 0.2) {
        let rep2 = await groqLLM(SYS.toEN + " ||Important: the final text MUST be fully in English. Afrikaans in the output is forbidden.", final, LADDER);
        if (!rep2) { await new Promise((r) => setTimeout(r, 3000)); rep2 = await groqLLM(SYS.toEN + " ||Important: the final text MUST be fully in English. Afrikaans in the output is forbidden.", final, LADDER); }
        if (!rep2) rep2 = await platformGemini(SYS.toEN + " ||Important: the final text MUST be fully in English. Afrikaans in the output is forbidden.", final);
        if (rep2) {
          const rws2 = (rep2.toLowerCase().match(/[a-z']+/g) || []);
          const afc2 = rws2.filter((w) => afOnly.includes(w)).length;
          if (!(rws2.length > 0 && afc2 >= 2 && afc2 / rws2.length > 0.2)) final = sane(rep2, text, kind);
        }
      }
    }
    // v23.18: TR echo guard — target is Afrikaans but output stayed English (model echoed input). Repair pass.
    if (kind === "tr" && final && (translate || langRaw === "translate_af" || langRaw.startsWith("vertaal_af") || langRaw === "to_af")) {
      const norm = (t: string) => t.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
      const echoed = norm(final) === norm(text);
      const wc = (final.match(/[a-z']+/gi) || []).length;
      const ec = englishCount(final);
      if (echoed || (wc > 0 && ec >= 2 && ec / wc > 0.2)) {
        let rep = await groqLLM(SYS.toAF + " ||Belangrik: die finale teks MOET volledig in Afrikaans wees. Engels in die uitset is verbode.", final, LADDER);
        if (!rep) { await new Promise((r) => setTimeout(r, 3000)); rep = await groqLLM(SYS.toAF + " ||Belangrik: die finale teks MOET volledig in Afrikaans wees. Engels in die uitset is verbode.", final, LADDER); }
        if (!rep) rep = await platformGemini(SYS.toAF + " ||Belangrik: die finale teks MOET volledig in Afrikaans wees. Engels in die uitset is verbode.", final); // v23.45 Gemini
        if (rep) {
          const rwc = (rep.match(/[a-z']+/gi) || []).length;
          const rec = englishCount(rep);
          if (!(rwc > 0 && rec >= 2 && rec / rwc > 0.2)) final = sane(rep, text, kind);
        }
      }
    }

    // 3. Deterministic AF word fixes + German/Dutch detector with one retry (all modes)
    if (isAF) final = afFix(final);
    // v23.27: AF-doel vertalings kry ook die woord-regstellings (nooit op Engelse uitsette nie)
    if (kind === "tr" && final && (translate || langRaw.startsWith("vertaal_af") || langRaw === "translate_af" || langRaw === "to_af" || langRaw === "vertaal" || langRaw === "translate")) final = afFix(final);
    if (germanDutch(final)) {
      const retry = await groqLLM(SYS.af_retry, final);
      if (!retry) { const g = await platformGemini(SYS.af_retry, final); if (g && !germanDutch(g)) final = sane(g, final, "fix"); }
      if (retry && !germanDutch(retry)) final = sane(retry, final, "fix");
    }
    if (isAF) final = afFix(final);

    // v22.9: deterministic English fixes for EN dictations
    if (isEN) final = enFix(final);

    // v22.4: auto-repair polish pass — surgical word replacements only (never rewrites the sentence)
    if (isAF && !translate && final) {
      let polished = await groqLLM(SYS.polish, final);
      if (!polished) polished = await platformGemini(SYS.polish, final);
      if (polished) {
        try {
          const jm = polished.match(/\[[\s\S]*\]/);
          if (jm) {
            const pairs: any[] = JSON.parse(jm[0]);
            let s2 = final;
            for (const p of pairs) {
              const bad = String(p?.verkeerd || "").trim();
              const good = String(p?.reg || "").trim();
              if (bad && good && bad.toLowerCase() !== good.toLowerCase() && s2.toLowerCase().includes(bad.toLowerCase())) {
                const re2 = new RegExp("\\b" + bad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
                s2 = s2.replace(re2, (mm: string) => (mm[0] === mm[0].toUpperCase() ? good.charAt(0).toUpperCase() + good.slice(1) : good));
              }
            }
            final = afFix(s2);
          }
        } catch { /* bad JSON from model -> keep current final */ }
      }
    }

    // v22.9: training ear for ALL modes (AF, EN, translate) — auto-train learns from every dictation
    let capInfo = "off";
    {
      const tag = translate ? "tr_debug_" : (isAF ? "af_debug_" : (isEN ? "en_debug_" : "auto_debug_"));
      capInfo = await captureSample(req, tag, langRaw + (translate ? "|tr" : ""), fname, text, second, final, Date.now() - t0, audio as Blob);
    }

    const resp: any = { success: true, text: final, v: "23.59" };
    if (dbg) resp.debug = { lang: langRaw, translate: translate, raw: text, second: second, ms: Date.now() - t0, cap: capInfo };
    return out(resp);
  } catch (e: any) {
    return out({ success: false, error: String(e?.message || e).slice(0, 120) });
  }
}