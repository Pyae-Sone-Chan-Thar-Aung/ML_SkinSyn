import { KNN } from '../../src/ml/models/knn';
import { SVM } from '../../src/ml/models/svm';
import { NaiveBayes } from '../../src/ml/models/naiveBayes';

describe('Machine Learning Models', () => {
    let knn: KNN;
    let svm: SVM;
    let naiveBayes: NaiveBayes;

    beforeEach(() => {
        knn = new KNN();
        svm = new SVM();
        naiveBayes = new NaiveBayes();
    });

    test('KNN model should train and predict correctly', () => {
        const trainingData = [
            { features: [1, 2], label: 'A' },
            { features: [2, 3], label: 'B' },
        ];
        knn.train(trainingData);
        const prediction = knn.predict([1.5, 2.5]);
        expect(prediction).toBe('A');
    });

    test('SVM model should train and predict correctly', () => {
        const trainingData = [
            { features: [1, 2], label: 'A' },
            { features: [2, 3], label: 'B' },
        ];
        svm.train(trainingData);
        const prediction = svm.predict([1.5, 2.5]);
        expect(prediction).toBe('A');
    });

    test('Naive Bayes model should train and predict correctly', () => {
        const trainingData = [
            { features: [1, 0], label: 'A' },
            { features: [0, 1], label: 'B' },
        ];
        naiveBayes.train(trainingData);
        const prediction = naiveBayes.predict([1, 0]);
        expect(prediction).toBe('A');
    });
});