//react-router-dom imports
import { Link, useLoaderData } from "react-router-dom";
//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//library imports
import { toast } from "react-toastify";

//loader
export function dashboardLoader()
{
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName , budgets , expenses }
}

//action
export async function dashboardAction({request})
{
    await waait();

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)
    
    //new user creation
    if(_action === "newUser")
    {
     try{
        localStorage.setItem("userName", JSON.
        stringify(values.userName))
        return toast.success(`Welcome, ${values.userName}`)
       }

       catch(e){
        throw new Error("There was a problem creating your account.")
       }
    }


    if(_action === "createBudget")
    {
        try{
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,      
             })
            return toast.success("Budget Created!")
        }
        catch(e){
            throw new Error("There was a problem creating your budget.")
        }
    }

    if(_action === "createExpense")
        {
            try{
                //create an expense
                createExpense({
                    name: values.newExpense,
                    amount: values.newExpenseAmount,  
                    budgetId: values.newExpenseBudget    
                 })
                return toast.success(`Wohoo! Expense for ${values.newExpense} created.`)
            }
            catch(e){
                throw new Error("There was a problem creating your expense.")
            }
        }

        if(_action === "deleteExpense")
            {
                try{
                    deleteItem ({
                        key: "expenses",
                        id: values.expenseId
                    })   
                    return toast.success(`Expense deleted!`)
                }
                catch(e){
                    throw new Error("There was a problem deleting your expense.")
                }
            }
}

const Dashboard = () =>
    {
        const { userName , budgets , expenses} = useLoaderData()

        return(
            <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">
                        {userName}<svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={3.0} 
                        stroke="currentColor" 
                        height={40} 
                        className="size-6">
  <path 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
  />   
</svg>
</span></h1>

<div className="grid-sm">
    {
        budgets && budgets.length > 0
        ? (
            <div className="grid-lg">
                <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets=
                    {budgets} />
                </div>
                <h2>Exisiting Budgets</h2>
                <div className="budgets">
                   {
                    budgets.map((budget) =>(
                        <BudgetItem key = {budget.id}
                        budget = {budget} />
                    ))
                   } 
                </div>
                {
                    expenses && expenses.length >0 && (
                        <div className="grid-md">
                            <h2>Recent Expense</h2>
                            <Table 
                            expenses={expenses
                                .sort((a, b) => b.createdAt - a.createdAt)
                                .slice(0,5) }
                            />
                            {expenses.length > 5 && (
                                <Link
                                to="expenses"
                                className="btn btn--dark"
                                >
                                    View all expenses
                                </Link>
                            )}
                        </div>
                    )
                }
            </div>
        )
        :  (
            <div className="grid-sm">
                <p>Every penny counts – make each one work for you with a budget.</p>
                <p>Create a budget to get started...</p>   
                <AddBudgetForm />
            </div>
            )
    }

</div>
                </div>
            ) : <Intro />}
            </>
        )
        
    }
export default Dashboard
    