document.addEventListener("DOMContentLoaded",() => {
    const expenseForm= document.getElementById("form");
    const Expenselist=document.getElementById("expense-list");
    const totalamount=document.getElementById("total-amount");
    const screenshot=document.getElementById("screenshot");

    
    
    let expenses=[];
    expenseForm.addEventListener("submit",(e) => {
        e.preventDefault();
        let name =document.querySelector(".name").value;
        let amount =parseFloat(document.querySelector(".amount").value);
        let category =document.querySelector(".category").value;
        let date =document.querySelector(".date").value;
        
        let expense={
        id:Date.now(),
        name,
        amount,
        category,
        date
        };
        
        
        expenses.push(expense);
        const old_data=JSON.parse(localStorage.getItem("expenses"))||[];
        old_data.push(expense);
        localStorage.setItem("expenses",JSON.stringify(old_data));
        
        

        
        

        
        displayExpenses(expenses);
        updatetotalamount();
        expenseForm.reset();
        

    });
        
     function displayExpenses(expenses){
        
        console.log("button clicked");
        Expenselist.innerHTML="";
        expenses.forEach(expense => {
           const row=document.createElement("tr");
           row.innerHTML=`
            
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            `
           ;
           
           row.addEventListener("mouseover",function(){
            row.style.backgroundColor="rgb(122, 214, 226)";

           }

           );
           row.addEventListener("mouseout",function(){
            row.style.backgroundColor="transparent";

           }

           );
           Expenselist.appendChild(row);
        }

        )
        };





    function updatetotalamount(){
        const total=expenses.reduce((sum,expense)=>sum + expense.amount,0);
        totalamount.textContent=total.toFixed(2);
        
    

    
    }
});

function takeScreenshot(target) {
    if (typeof html2canvas !== "function") {
        alert("Screenshot library not loaded. Please check your internet connection and reload.");
        return;
    }

    const el =
        target ||
        document.querySelector(".maincontent") ||
        document.querySelector(".main") ||
        document.body;

    html2canvas(el, {
        backgroundColor: null,
        scale: Math.min(2, window.devicePixelRatio || 1),
        useCORS: true
    }).then(canvas => {
        const imageData = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
        a.href = imageData;
        a.download = `expense-tracker-${stamp}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }).catch(err => {
        console.error(err);
        alert("Could not take screenshot. Try again after scrolling to top.");
    });
}

// Keep compatibility with your button's onclick="tackScreenShot()"
window.tackScreenShot = function tackScreenShot() {
    takeScreenshot();
};

    
        

