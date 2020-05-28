class BUDGETAPP
{
    constructor()
    {
        this.feedBack = document.querySelector('.feedback');
        this.budgetInput = document.querySelector('.field');
        this.inputbutton = document.querySelector('.input-button');

        this.expenseInput = document.querySelector('.expense-field[type=text]');
        this.expenseAmount = document.querySelector('.expense-field[type=number]');

        this.totalBudget = document.querySelector('.budget-total');
        this.totalExpense = document.querySelector('.total-expense');
        this.totalBalance = document.querySelector('.total-balance');

        this.expenseList = document.querySelector('.list-main')
        this.itemID = 0;
        this.itemList = [];
    }
    budgetForm()
    {
        const value = this.budgetInput.value;
        console.log(value);
        let message = '';
        if( value =='' || value < 0)
        {
            message = `Budget Cannot be empty or negavite`;
            this.feedBack.textContent = message;
            this.feedBack.classList.add('feedback-shown');
            const self = this;
            setTimeout(()=>{
                self.feedBack.classList.remove('feedback-shown');
                message.textContent = '';
            }, 3000);
        }
        else
        {
            this.totalBudget.textContent = `${value}`;
            this.showBalance();
            this.budgetInput.value = '';
        }
    }
    expenseForm()
    {
        const expenseName = this.expenseInput.value;
        const expenseValue = this.expenseAmount.value;
        if(expenseName == '' || expenseValue == '' || expenseValue < 0)
        {
            let message = '';
            message = 'Expense Name Or Comment Cannot Be Empty Or Negative';
            this.feedBack.textContent = message;
            this.feedBack.classList.add('feedback-shown');
            const self = this;
            setTimeout(() => {
                self.feedBack.classList.remove('feedback-shown');
                self.feedBack.textContent = '';
            }, 3000);
        }
        else
        {
            let expense = {
                id: this.itemID,
                title: expenseName,
                amount: parseInt(expenseValue)
            };
            this.expenseInput.value = '';
            this.expenseAmount.value = '';
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
    }
    addExpense(expense)
    {
        var expenseItem = document.createElement('div');
        expenseItem.classList.add('expense');
        expenseItem.innerHTML = `<div class='item'>-${expense.title}</div>
                                 <div class='item'>$${expense.amount}</div>
                                 <div class='item' data-id="${expense.id}">
                                    <i id ="item-edit"  class="fas fa-edit"></i>
                                    <i id="item-remove" class="fas fa-trash"></i>
                                 </div>`;
        this.expenseList.appendChild(expenseItem);
    }
    totatExpense()
    {
        let totalExpense = 0;
        if(this.itemList.length > 0)
        {
            totalExpense = this.itemList.reduce( function(acc, curr)
            {
                acc += curr.amount;
                return acc;
            }, 0);
        }
        this.totalExpense.textContent = `$ ${totalExpense}`;
        return totalExpense;
    }
    editExpense(element)
    {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement;
        this.expenseList.removeChild(parent);
        let expense = this.itemList.filter(function(item)
        {
            if(item.id == id)
            {
                return item;
            }
        });
        this.expenseInput.value = expense[0].title;
        this.expenseAmount.value = expense[0].amount;
        console.log(this.itemList);
        let tempList = this.itemList.filter(function(item)
        {
            if(item.id != id)
            {
                return item;
            }
        });
        this.itemList = tempList;
        console.log(this.itemList);
        this.showBalance(); 
    }
    deleteExpense(element)
    {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement;
        this.expenseList.removeChild(parent);
        let tempList = this.itemList.filter(function(item)
        {
            if(item.id != id)
            {
                return item;
            }
        });
        this.itemList = tempList;
        this.showBalance();
    }
    showBalance()
    {
        const expense = this.totatExpense();
        const balance = parseInt(this.totalBudget.textContent) - expense;
        this.totalBalance.textContent = `$ ${balance}`;
        if(balance > 0)
        {
            this.totalBalance.style.color = 'green';
        }
        else if(balance < 0)
        {
            this.totalBalance.style.color = 'red';
        }
        else if(balance == 0)
        {
            this.totalBalance.style.color = 'black'
        }
    }
}

function eventListeners()
{
    var input = document.querySelector('.input-button');
    var expense = document.querySelector('#expense-budget > form');
    var expenseList = document.querySelector('.list-main');

    const form = new BUDGETAPP();

    input.addEventListener('click',()=>{
        form.budgetForm();
    });
    expense.addEventListener('submit',(e)=>{
       e.preventDefault();
       form.expenseForm();
    });
    expenseList.addEventListener('click',(e)=>{
        if(e.target.id === 'item-edit')
        {
            form.editExpense(e.target.parentElement); 
        }
        else if(e.target.id === 'item-remove')
        {
            form.deleteExpense(e.target.parentElement);
        }
    });
}

document.addEventListener('DOMContentLoaded',eventListeners);
