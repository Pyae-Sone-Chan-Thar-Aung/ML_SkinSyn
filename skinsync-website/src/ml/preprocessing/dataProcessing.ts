import pandas as pd

// Function to load dataset from a CSV file
export const loadDataset = (filePath: string): any => {
    return pd.read_csv(filePath);
};

// Function to clean the dataset
export const cleanDataset = (data: any): any => {
    // Remove duplicates
    data = data.drop_duplicates();
    
    // Fill missing values
    data = data.fillna({
        'skin_type': 'unknown',
        'sensitivity_level': 'unknown',
        'product_name': 'unknown',
        'ingredients': '',
        'review_text': '',
        'reaction_occurred': 'no',
        'improvement_percent': 0,
        'product_price': 0,
        'days_used': 0
    });
    
    return data;
};

// Function to preprocess the dataset
export const preprocessData = (filePath: string): any => {
    const dataset = loadDataset(filePath);
    const cleanedData = cleanDataset(dataset);
    return cleanedData;
};