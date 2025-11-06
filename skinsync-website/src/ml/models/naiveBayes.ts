import { GaussianNB } from 'ml-naivebayes';
import { DataFrame } from 'pandas-js';

class NaiveBayesModel {
    private model: GaussianNB;

    constructor() {
        this.model = new GaussianNB();
    }

    train(features: number[][], labels: number[]): void {
        this.model.train(features, labels);
    }

    predict(features: number[][]): number[] {
        return this.model.predict(features);
    }

    getProbabilities(features: number[][]): number[][] {
        return this.model.predictProba(features);
    }
}

export default NaiveBayesModel;