export const waait = () => new Promise(res =>
    setTimeout(res, Math.random() * 800))

//colors
const generateRandomColor = () => {
    const exisitingBudgetLength = fetchData("budgets")?.
    length ?? 0;
    return `${exisitingBudgetLength * 34} 65% 50%`
}
// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//get all items from local storage
export const getAllMatchingItems = ({category , key
    , value }) => {
        const data = fetchData(category) ?? [];
        return data.filter((item) => item[key] === value );
}

//delete bitem frim local storage
export const deleteItem = ({key , id}) => {
    const existingData = fetchData(key);
    if(id)
        {
            const newData = existingData.filter((item) => item.id !== id);
            return localStorage.setItem(key, JSON.stringify(newData));
        }
        return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({
    name ,  amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()

    }
    const exisitingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets",
        JSON.stringify([...exisitingBudgets, newItem]))
}

// create expense
export const createExpense = ({
    name ,  amount , budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId

    }
    const exisitingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",
        JSON.stringify([...exisitingExpenses, newItem]))
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
     const expenses = fetchData("expenses") ?? [];
     const budgetSpent = expenses.reduce((acc, expense) => {
        //check if the expense.id === budgetId passed in
        if(expense.budgetId !== budgetId)
            return acc
        //add the current amt to the total
        return acc += expense.amount
     }, 0)
     return budgetSpent;
}

//FORMATTING

export const formatDateToLocaleString =(epoch) =>
    new Date(epoch).toLocaleDateString();

//forrmatting percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style : "percent" , 
        minimumFractionDigits: 0
    })
}

//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency:"INR"
    })
}