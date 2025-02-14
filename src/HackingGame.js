import React, { useState, useEffect } from "react";
import { ReactTerminal } from "react-terminal";

export default function HackingGame() {
  const [history, setHistory] = useState(["🔒", "", "Gib 'start' ein, um zu beginnen.", ""]);
  const [step, setStep] = useState(0);
  const [animatedTitle, setAnimatedTitle] = useState("");
  const [animatedText, setAnimatedText] = useState("");
  const [solvedWords, setSolvedWords] = useState(Array(7).fill("_")); // Initialisiert mit Unterstrichen für 7 Rätsel
  const titleText = "Hacking Konsole";
  const paragraphText = "Agent, du musst eine geheime Nachricht entschlüsseln. Das System ist mit mehreren Sicherheitsebenen geschützt. Schalte sie eine nach der anderen aus!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedTitle(titleText.slice(0, index + 1));
      index++;
      if (index === titleText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let glitchInterval;
    setTimeout(() => {
      let index = 0;
      glitchInterval = setInterval(() => {
        setAnimatedText(paragraphText.slice(0, index + 1));
        index++;
        if (index === paragraphText.length) clearInterval(glitchInterval);
      }, 50);
    }, 1000);
    return () => clearInterval(glitchInterval);
  }, []);

  const updateHistory = (newMessage, userInput = null) => {
    setHistory((prev) => [
      ...prev,
      userInput ? `$ ${userInput}` : "", // Benutzereingabe anzeigen
      newMessage, // Neue Nachricht
      "$ " // Neuer Prompt für nächste Eingabe
    ]);
  };

  const updateSolvedWords = (step, word) => {
    const newSolvedWords = [...solvedWords];
    newSolvedWords[step - 1] = word; // Aktualisiere das gelöste Wort
    setSolvedWords(newSolvedWords);
  };

  const commands = {
    start: () => {
      if (step !== 0);
      setStep(1);
      updateHistory("Erstes Rätsel:\nÜbersetze die Binärnachricht:\n01111010 01110101 01110011 01100001 01101101 01101101 01100101 01101110", "start");
    },
    zusammen: () => {
      if (step !== 1);
      setStep(2);
      updateSolvedWords(1, "zusammen"); // Aktualisiere das gelöste Wort
      updateHistory("Sehr gut!✅\nNächstes Rätsel:\nEin Teil der Botschaft wurde in Hexadezimal codiert. Konvertiere den Code in Text: 73 70 69 65 6c 65 6e", "zusammen");
    },
    spielen: () => {
      if (step !== 2);
      setStep(3);
      updateSolvedWords(2, "spielen"); // Aktualisiere das gelöste Wort
      updateHistory("Sehr gut!✅\nNächstes Rätsel:\nEine wichtige Information wurde in einem Python Script versteckt: print(''.join(chr(x) for x in [68, 114, 97, 99, 104, 101]))", "spielen");
    },
    drachen: () => {
      if (step !== 3);
      setStep(4);
      updateSolvedWords(3, "drachen"); // Aktualisiere das gelöste Wort
      updateHistory("Sehr gut!✅\nNächstes Rätsel:\nDie Zeitkapsel ist verschlüsselt. Gib das Datum von 1741219200 im Format tt.mm.jjjj ein", "drachen");
    },
    "06.03.2025": () => {
      if (step !== 4);
      setStep(5);
      updateSolvedWords(4, "06.03.2025"); // Aktualisiere das gelöste Wort
      updateHistory("Sehr gut!✅\nNächstes Rätsel:\nDieser verschlüsselte Text wurde in Base64 gespeichert. Dekodiere ihn: U3BsaXQ=", "06.03.2025");
    },
    split: () => {
      if (step !== 5);
      setStep(6);
      updateSolvedWords(5, "split"); // Aktualisiere das gelöste Wort
      updateHistory("Sehr gut!✅\nNächstes Rätsel:\nDer letzte Teil der Nachricht wurde mit ROT13 verschlüsselt. Entschlüssele ihn: svpgvba", "split");
    },
    fiction: () => {
      if (step !== 6);
      setStep(7);
      updateSolvedWords(6, "fiction"); // Aktualisiere das gelöste Wort
      updateHistory("Glückwunsch, Agent!\nDu hast das System geknackt und die geheime Nachricht entschlüsselt!\n Happy Valentinesday 💌\n Mission erfolgreich!\nDoch das eigentliche Abenteuer beginnt jetzt...\nIch freue mich darauf, mit dir in die Welt von Split Fiction einzutauchen, gemeinsam Missionen zu lösen und spannende Herausforderungen zu meistern. Mal sehen, ob wir wieder ein gutes Team sind!", "fiction");
    },
    help: () => {
      let hint = "";
      switch (step) {
        case 1:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nbinary_string = \"01111010 01110101 01110011 01100001 01101101 01101101 01100101 01101110\"; text=\"\".join(chr(int(b, 2)) for b in binary_string.split()); print(text);";
          break;
        case 2:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nprint(bytes.fromhex(\"73 70 69 65 6c 65 6e\").decode());";
          break;
        case 3:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nprint(''.join(chr(x) for x in [68, 114, 97, 99, 104, 101]));";
          break;
        case 4:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nimport datetime; print(datetime.datetime.fromtimestamp(1741219200));";
          break;
        case 5:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nimport base64; print(base64.b64decode(\"U3BsaXQ=\").decode(\"utf-8\"));";
          break;
        case 6:
          hint = "Hinweis: Nutze folgenden Python-Code:\n\nimport codecs; print(codecs.encode(\"svpgvba\", \"rot_13\"));";
          break;
        default:
          hint = "Hinweis: Starte mit 'start'.";
      }
      updateHistory(`ℹ️ ${hint}`, "help");
    },
  };

  return (
    <div style={{ background: "#f4e04d", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "black", textAlign: "center", animation: "fadeIn 2s ease-in-out", fontFamily: "monospace", paddingTop: "50px" }}>{animatedTitle}</h1>

      <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "black", fontSize: "18px", maxWidth: "600px", textAlign: "center", animation: "fadeIn 2s ease-in-out", fontFamily: "monospace" }}>
          {animatedText}
        </p>
      </div>

      <div style={{ background: "black", marginTop: "40px", padding: "20px", borderRadius: "10px", width: "80%", maxWidth: "800px", minHeight: "300px", animation: "rotateIn 1.5s ease-out" }}>
        <ReactTerminal
          commands={commands}
          prompt="$ "
          theme="matrix"
          showControlBar={false}
          showControlButtons={false}
          enableInput={true}
          welcomeMessage={history.join("\n")}
          defaultHandler={(input) => {
            updateHistory("❌ Leider Falsch. Tippe 'help' für einen Hinweis.", input);
          }}
        />
      </div>

      {/* Gelöste Wörter anzeigen */}
      <div style={{ marginTop: "20px", textAlign: "center", fontFamily: "monospace", fontSize: "18px", color: "black", padding:"50px" }}>
        <p>🔓 Fortchritt:</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {solvedWords.map((word, index) => (
            <span key={index} style={{ fontWeight: "bold" }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes rotateIn {
            from { transform: rotateY(180deg); opacity: 0; }
            to { transform: rotateY(0deg); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}