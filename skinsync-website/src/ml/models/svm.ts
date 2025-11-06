// src/ml/models/svm.ts

import { SVC } from 'libsvm-js'; // Assuming a library for SVM is used
import { DataPoint } from '../../types'; // Importing DataPoint type

export class SVMModel {
    private model: any;

    constructor() {
        this.model = new SVC();
    }

    public async train(data: DataPoint[], labels: number[]): Promise<void> {
        const features = data.map(point => Object.values(point));
        await this.model.train(features, labels);
    }

    public predict(data: DataPoint[]): number[] {
        const features = data.map(point => Object.values(point));
        return this.model.predict(features);
    }
}