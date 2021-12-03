async function Translate(){
    //e.preventDefault();
    let source_lang = document.getElementById("source_select");
    let source_language = source_lang.options[source_lang.selectedIndex].text;
    let converted_lang = document.getElementById("converted_select");
    let converted_language = converted_lang.options[converted_lang.selectedIndex].text;
    let content = document.getElementById("source_language").value;
    let converted_content = document.getElementById("converted_language");
    const res = await fetch("https://libretranslate.de/languages", {
	    method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    let arr = await res.json();
    let source_code = "" , converted_code = "";
    arr.forEach((index) => {
        if(index.name == source_language){
            source_code = index.code;
        }
        if(index.name == converted_language){
            converted_code = index.code;
        }
    })
    const result = await fetch("https://libretranslate.de/translate", {
	method: "POST",
	body: JSON.stringify({
            q: content,
            source: `${source_code}`,
            target: `${converted_code}`
        }),
        headers: { "Content-Type": "application/json" }
    });
    let final_result = await result.json();
    converted_content.textContent = final_result.translatedText;
}