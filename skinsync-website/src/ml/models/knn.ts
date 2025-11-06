import { KNeighborsClassifier } from 'sklearn.neighbors';
import { DataFrame } from 'pandas-js';

export class KNNModel {
    private model: KNeighborsClassifier;

    constructor(private nNeighbors: number = 5) {
        this.model = new KNeighborsClassifier(nNeighbors);
    }

    public train(data: DataFrame, target: string): void {
        const features = data.drop(target, { axis: 1 });
        const labels = data.get(target);
        this.model.fit(features.values, labels.values);
    }

    public predict(input: any): any {
        return this.model.predict([input]);
    }
}