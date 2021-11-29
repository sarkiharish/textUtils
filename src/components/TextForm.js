import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("");

    const changeToUppercase = () => {
        let newText = text.toUpperCase();
        setText(newText);
       props.showAlert("Converted to UpperCase!!!", "success");
    }

    const changeToLowercase = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase!!!", "success");
    }

    const clearText = () => {
        let newText = ('');
        setText(newText);
        props.showAlert("Text cleared!!!", "success");
    }

    // const onTranslate = () => {    
    //     var options =    
    //      {    
    //       sourceLanguage:    
    //       google.elements.transliteration.LanguageCode.ENGLISH,    
    //       destinationLanguage:    
    //       google.elements.transliteration.LanguageCode.HINDI,    
    //       shortcutKey:    
    //        'ctrl+g',    
    //        transliterationEnabled:    
    //         true    
    //       };  
    //  }  

    // const onCapitalize = () => {
    //    if(text.length===0){
    //        console.log("Please enter text first.");
    //    }
        
    //    const words = text.split(" ");
       

    //     for (let i = 0; i < words.length; i++) {
    //         words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    //     }
    //     setText(words.join(" "));
    // }


    

    const onCapitalizeSelectedText = () => {
        if(window.getSelection){
            let seletedText = window.getSelection().toString();

            if(seletedText){
                let newText = text.replace(seletedText, seletedText.toUpperCase());
                setText(newText);
                props.showAlert("Selected text is Capitalized!!!","success");
            }
        }
    }

    // const onChangeTheme = () => {
    //     let bgcolor = document.querySelector('.body').style.backgroundCOlor;
    //     if(bgcolor==='#042743'){
    //         document.querySelector('.body').style.color="white"
    //     }else{
    //         document.querySelector('.body').style.color="#042743"
    //     }
    // }

    const handleCopy = () => {
        // var text = document.getElementById("myBox");
        // text.select();
        navigator.clipboard.writeText(text);
        // document.getSelection().removeAllRanges();
        props.showAlert("Text Copied to Clipboard!!!", "success");
    }

    const handleExraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Spaces removed!!!", "success");
    }

    const changeHandle = (event) => {
        setText(event.target.value);
    } 


    return (
        <>
        <div className="container" style={{color : props.mode==='dark'?'white':'#042743'}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={changeHandle} style={{backgroundColor:props.mode==='dark'?'#13466e':'white', color:props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={changeToUppercase}>Convert to UpperCase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={changeToLowercase}>Convert to LowerCase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={clearText}>Clear Text</button>
            {/* <button disabled={text.length===0} className="btn btn-primary  my-1 mx-1" onClick={onCapitalize}>Capitalize</butdisabled=ton> */}
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onCapitalizeSelectedText}>Capitalize Selected Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExraSpaces}>Remove Extra Spaces</button>
            {/* <button className="btn btn-primary mx-1 my-1" onClick={onChangeTheme}>Change Theme</button> */}
        </div>

        <div className="container my-3" style={{color : props.mode==='dark'?'white':'#042743'}}>
            <h2>Text Summary</h2>
            {/* <p>{text.split(" ").filter((y) => (y!=="")).length} Words and {text.length} characters.</p> */}
            <p>{text.split(/\s+/).filter((y) => {return y.length !== 0}).length} Words and {text.length} characters.</p>
            {/* <p>{text.split(" ").length} Words and {text.length} characters.</p> */}
            <p>Can be read in {0.008 * text.split("").filter((y) => {return y.length !== 0}).length} minutes.</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview."}</p>
        </div>

        </>
    )
}
