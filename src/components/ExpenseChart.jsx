import { PieChart, Pie, Tooltip, Legend } from 'recharts'

export default function ExpenseChart({ expenses }) {
    const data = extractData(expenses)

    if (!data.length) {
        return null
    }
    
    return (
        <>
            <h4>Summary of your expenses</h4>
            <div className='flex items-center justify-center'>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey={'value'}
                        isAnimationActive={true}
                        data={data}
                        width={400}
                        height={400}
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        fill='#8884d8'
                        label
                    />
                    <Legend content='Welcome'></Legend>
                    <Tooltip />
                </PieChart>
            </div>
        </>
    )
}

function extractData(expenses) {
    const amtByUrgency = {}
    expenses.forEach((expense) => {
        const urgencyName = expense.urgency_text
        amtByUrgency[urgencyName] = amtByUrgency[urgencyName] ?? 0
        amtByUrgency[urgencyName] += expense.amount
    })

    return Object.keys(amtByUrgency).map((key) => ({
        name: key,
        value: amtByUrgency[key],
    }))
}
