

class ViewClasses {

    //returns mobilenet classes related to views
    static getViewClasses() {
        return [
            "view",
            "maze, labyrinth",
            "valley, vale",
            "alp",
            "fountain",
            "volcano",
            "geyser",
            "lakeside, lakeshore",
            "pier",
            "promontory, headland, head, foreland",
            "seashore, coast, seacoast, sea-coast",
            "breakwater, groin, groyne, mole, bulwark, seawall, jetty",
            "cliff, drop, drop-off",
            "sandbar, sand bar",
            "coral reef",
            "worm fence, snake fence, snake-rail fence, Virginia fence",
            "rapeseed",
            "hay",
            "balloon",
            "viaduct",
            "parachute, chute"
        ];
    }

    //checks probability for that if image is a view
    static getViewClassification(predictionsMap) {
        let viewProbability = 0.0;
        const keys = [ ...predictionsMap.keys() ]

        keys.forEach(key => {
            if(this.getViewClasses().includes(key)){
                viewProbability = viewProbability + predictionsMap.get(key)
            }
        })

        return viewProbability;
    }
}

export default ViewClasses;