let dropMenu = document.querySelector(".nav-menu");
let sectionModal = document.querySelector(".container-section-modal");
let close = document.querySelector(".close");
let menu = document.querySelector(".menu");
let cards = document.querySelectorAll(".card-modal");
let bookmark = document.querySelector(".bookmark");
let pledge = document.querySelector(".pledge-select");
let completed = document.querySelector(".container-section-completed");
let submit = document.querySelectorAll(".submit");
let done = completed.querySelector(".done");
let money = document.querySelector(".money");
let progress = document.querySelector(".progress");
let targetAmount = document.querySelector(".target-amount");

completed.classList.add("not-active");
pledge.classList.add("not-active");
sectionModal.classList.add("not-active");

money = money.innerHTML.match(/\d/g).join("");
targetAmount = targetAmount.innerHTML.match(/\d/g).join("");
let percentage = (money * 100)/targetAmount + "%" ;
progress.style.width = percentage;

submit.forEach(btn => {
    btn.onclick = () => {
        completed.classList.remove("not-active");
        sectionModal.classList.add("not-active");
        done.onclick = () => {completed.classList.add("not-active");}
    }
    
    let card = btn.parentElement.parentElement;
    let stock = btn.previousElementSibling;
    if (stock.classList.contains("stock")) {
        stock = stock.firstChild.nodeValue;
        if (stock == 0) {
            btn.classList.add("disabled");
            btn.setAttribute("disabled", true);
            card.classList.add("disabled");
        }
    }
});

cards.forEach(card => {
    let selected = card.querySelector(".check-selected");
    let edition = card.querySelector(".edition");
    let input = pledge.querySelector("input");
    let i = pledge.querySelector("i");
    let p = pledge.querySelector("p");
    let stockLeft = card.querySelector("h1");
    
    if (stockLeft !== null) {
        stockLeft = stockLeft.firstChild.nodeValue;
    }
    if (stockLeft == 0) {
        card.classList.add("disabled");
        edition.classList.add("disabled");
    } else {
        edition.onmouseover = () => {
            if (!card.classList.contains("active")) {
                card.classList.add("active");
                if (!selected.classList.contains("not-active"))  { 
                    selected.classList.add("not-active"); 
                }
            }
        }
        edition.onmouseout = () => {
            if (selected.classList.contains("not-active")){
                card.classList.remove("active");
            } 
        }
        
        card.onclick = (e) => {
            if (e.target.matches(".edition")){
                if (!selected.classList.contains("not-active")) {
                    selected.classList.add("not-active");
                    card.classList.remove("active");
                    card.classList.remove("border-active");
                    card.removeChild(pledge);
                } else {
                    cards.forEach(card => {
                        card.classList.remove("active");
                        card.classList.remove("border-active");
                    });
                    card.classList.add("active");
                    card.classList.add("border-active");
                    card.appendChild(pledge);
                    pledge.classList.remove("not-active");
                    selected.classList.remove("not-active");
                    input.classList.add("not-active");
                    i.classList.add("not-active");
                    p.classList.add("not-active");
                    pledge.style.justifyContent = "right";
    
                    if (!card.id == "0") {
                        input.value = card.id;
                        input.classList.remove("not-active");
                        i.classList.remove("not-active");
                        p.classList.remove("not-active");
                        pledge.style.justifyContent = "space-between";
                    } 
                }
            } else if (e.target.matches(".submit")) {
                selected.classList.add("not-active");
                card.classList.remove("active");
                card.classList.remove("border-active");
                card.removeChild(pledge);
            }
        }    
    }
});
    
window.onclick = (e) => {
    if (e.target.matches(".back-project")) {
        sectionModal.classList.remove("not-active");
    } else if (e.target.matches(".close-modal")) {
        sectionModal.classList.add("not-active")
    } else if (e.target.matches(".bookmark")) {
        bookmark.classList.toggle("active");
    } else if (e.target.matches(".menu")) {
        dropMenu.classList.add("active");
        menu.classList.add("not-active");
        close.classList.add("active");
    } else if (e.target.matches(".close") || !e.target.closest(".dropmenu")) {
        dropMenu.classList.remove("active");
        close.classList.remove("active");
        menu.classList.remove("not-active");
    }
}