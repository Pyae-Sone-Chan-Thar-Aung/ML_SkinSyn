# SkinSync - Personalized Skincare Recommendations

## Overview

SkinSync is a web application that provides personalized skincare product recommendations based on user profiles and product ingredients. Utilizing core machine learning algorithms, SkinSync analyzes user data to suggest the most suitable products for various skin types and conditions.

## Features

- **Product Recommendations**: Users can input their skin type and receive tailored product suggestions.
- **User Profiles**: Users can create and manage their profiles, including preferences and skin conditions.
- **Ingredient Analysis**: The application analyzes product ingredients to provide insights into their suitability for different skin types.
- **Machine Learning Models**: Implements K-Nearest Neighbors, Support Vector Machine, and Naive Bayes algorithms for accurate predictions.

## Project Structure

```
skinsync-website
├── src
│   ├── api
│   ├── ml
│   ├── components
│   ├── types
│   ├── utils
│   ├── styles
│   └── app.ts
├── tests
├── public
│   └── assets
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skinsync-website.git
   cd skinsync-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage

- Navigate to the homepage to start using the product recommendation feature.
- Create a user profile to save your preferences.
- Analyze product ingredients to understand their effects on your skin.

## Testing

To run the tests, use the following command:
```bash
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.