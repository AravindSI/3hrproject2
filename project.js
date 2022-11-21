function saveToLocalStorage(event){
	event.preventDefault();
	const chooseExpenseAmount=event.target.Chooseexpenseamount.value;
	const chooseDescription=event.target.choosedescription.value;
	const chooseAcategory=event.target.chooseacategory.value;
	const obj={
		chooseExpenseAmount,
		chooseDescription,
		chooseAcategory
	};
    axios.post("https://crudcrud.com/api/6e1033c3e08941688fa35690ea67f864/appointmentdata",obj)
    .then((response)=>{
        showExpensesOnScreen(response.data)
        console.log(response);
    })
    .catch((err)=>{
        console.log(err)
    });
}

    window.addEventListener("DOMContentLoaded",()=>{
        axios.get("https://crudcrud.com/api/6e1033c3e08941688fa35690ea67f864/appointmentdata")
    .then((response)=>{
        console.log(response)
        for(var i=0;i<response.data.length;i++){
            showExpensesOnScreen(response.data[i])
        }
    })
       .catch((err)=>{
        console.log(err)
    })
})

function showExpensesOnScreen(expense){
	const parentNode=document.getElementById("listOfExpenses");
	const childHTML = `<li id=${expense._id}>${expense.chooseExpenseAmount}- ${expense.chooseDescription} - ${expense.chooseAcategory}
                                        <button onclick=deleteUser('${expense._id}')> Delete Expense </button>
										<button onclick=editUserDetails('${expense.chooseDescription}','${expense.Chooseexpenseamount}','${expense.chooseAcategory}','${expense._id}')>Edit Expense </button></li>`;
	parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

function deleteUser(userId){
      axios.delete(`https://crudcrud.com/api/6e1033c3e08941688fa35690ea67f864/appointmentdata/${userId}`)
      .then((response)=>{
        removeUserFromScreen(userId)
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
}
function removeUserFromScreen(userId){
	const parentNode = document.getElementById('listOfExpenses');
	const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
	
}
function editUserDetails(chooseDescription,chooseExpenseAmount,chooseAcategory,userId){

	document.getElementById("choose description").value = chooseDescription;
	document.getElementById("Choose expense amount").value =chooseExpenseAmount;
	document.getElementById("choose a category").value =chooseAcategory;

	deleteUser(userId);
 }