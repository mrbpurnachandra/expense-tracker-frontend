export default function ExpenseFilter({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}) {
    return (
        <div className="border border-gray-300 px-4 py-4 bg-gray-200">
            <p className='text-sm text-gray-600'>
                You can filter by date to view expenses in specific interval.
            </p>
            <div className="flex space-x-4">
                <div>
                    <input
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        type='date'
                        name='startDate'
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        type='date'
                        name='endDate'
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
