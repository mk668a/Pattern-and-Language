function onButtonClick() {
    // output先 (output)
    var target = document.getElementById("output");
    // outputの表示をクリアする (clear output text)
    target.textContent = null

    // inputのテキスト取得　(get input text)
    var inputText = document.getElementById("id_textBox1").value;
    // 空白で分割して配列にする (input text to array)
    var inputTextArray = inputText.split(/[^a-zA-Z]|\s/);

    // マッチした単語があるか
    var isMatched = false;

    // 正規表現(define regular expression)
    // yellowタスク
    var vcv = new RegExp(/.*[aiueo][^aiueo][aiueo]$/ig);
    // orangeタスク
    var relatioVerb = new RegExp(/^(((belong|concern|consist|contain|cost|depend|equal|lack|matter|need|own|seem|sound)(s?|(ed)?|(ing)?))|((deserv|includ|involv|ow|requir|resembl)(e?|(es)?|(ed)?|(ing)?))|((process)(es?|(ed)?|(ing)?))|((ha)(ve|s|d|ving)|be(en|ing)?|is|a(m|re)|fit(s|ting)?))$/ig);
    // greenタスク
    var wasWere = new RegExp(/^(was|were)$/ig);
    var ing = new RegExp(/.+(ing)$/ig);
    var notVerb = new RegExp(/^(wing|king|ring|sing|thing|something|anything|everything|nothing|string|interesting|boring)$/ig);

    for (var i in inputTextArray) {
        // 正規表現にマッチしたら (if the word matches the regular expression)
        // console.log(inputTextArray[i]);

        // yellowタスク
        var task1 = inputTextArray[i].match(vcv);
        if (task1) {
            isMatched = true;
            var newNode = document.createElement("li");
            newNode.textContent = task1 + ": Matches yellow task";
            newNode.style.background = "yellow"
            target.appendChild(newNode);
        }

        // orangeタスク
        var task2 = inputTextArray[i].match(relatioVerb);
        if (task2) {
            isMatched = true;
            var newNode = document.createElement("li");
            newNode.style.background = "orange"
            newNode.textContent = task2 + ": Matches orange task";


            target.appendChild(newNode);
        }

        // greenタスク
        var task3_0 = inputTextArray[i].match(wasWere);
        // console.log(Number(i) + 1);

        if (task3_0 && (Number(i) + 1) < inputTextArray.length) {
            var task3_1 = inputTextArray[Number(i) + 1].match(ing);
            var task3_2 = inputTextArray[Number(i) + 1].match(notVerb);
            if (task3_1 && !task3_2) {
                isMatched = true;
                var newNode = document.createElement("li");
                newNode.style.background = "greenyellow"
                newNode.textContent = task3_0 + " " + task3_1 + ": Matches green task";
                target.appendChild(newNode);
            }
        }
    }


    // purpleタスク
    var person = nlp(inputText).match('#Person').out('text');
    var place = nlp(inputText).match('#Place').out('text');

    if (person) {
        isMatched = true;
        var newNode = document.createElement("li");
        newNode.textContent = person + ": Matches purple task ( Person )";
        newNode.style.background = "rgb(216, 182, 255)"
        target.appendChild(newNode);
    }
    if (place) {
        isMatched = true;
        var newNode = document.createElement("li");
        newNode.textContent = place + ": Matches purple task ( Place )";
        newNode.style.background = "rgb(216, 182, 255)"
        target.appendChild(newNode);
    }

    // blueタスク
    var verbs = nlp(inputText).verbs().data();
    var tense = nlp(inputText).verbs().conjugation();

    if (verbs && tense) {
        isMatched = true;

        for (var i in verbs) {
            // console.log(verbs[i].text, tense[i]);
            var newNode = document.createElement("li");
            newNode.style.background = "rgb(0, 195, 255)"

            var v = document.createElement("a");
            v.innerText = verbs[i].text + " (" + tense[i] + ")";

            if (tense[i] == "Present") {
                v.style.borderBottom = "3px solid orange"
            }
            else if (tense[i] == "Past") {
                v.style.borderBottom = "3px solid red"
            }
            else {
                v.style.borderBottom = "3px solid blue"
            }

            var str = document.createElement("a");
            str.innerText = ": Matches blue task";

            newNode.appendChild(v)
            newNode.appendChild(str)

            target.appendChild(newNode);
        }
    }

    // マッチした単語がなかったら (if there is no matching word)
    if (!isMatched) {
        var newNode = document.createElement("li");
        newNode.textContent = "There is no matched word";
        target.appendChild(newNode);
    }

    // style of result list
    var childN = target.childNodes
    for (var i = 0; i < childN.length; i++) {
        childN[i].style.marginBottom = "1rem"
    }
}