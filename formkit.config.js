import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                outer: 'mb-5',
                label: 'block font-bold text-gray-700 mb-2 text-sm',
                input: 'w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500',
                help: 'text-sm text-gray-500',
                message: 'text-red-500 text-sm mt-1'
            },
            submit: {
                input: '$reset px-4 py-2 mt-3 w-auto rounded-md shadow-sm border-teal-600 text-white bg-teal-600 hover:bg-teal-700 focus:bg-teal-700'
            },
            file: {
                input: '$reset w-auto',
            }
        })
    }
}

export default config
