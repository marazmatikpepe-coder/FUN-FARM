window.gameState = {
    coins: 100,
    xp: 0,
    level: 1,
    silo: 0,
    siloMax: 50,
    barn: 0,
    barnMax: 50,
    
    // Семена хранятся в силосной башне
    seeds: {
        wheat: 3
    },
    
    // Грядки
    plots: [
        { id: 1, type: null, status: 'empty', timer: 0 },
        { id: 2, type: null, status: 'empty', timer: 0 },
        { id: 3, type: null, status: 'empty', timer: 0 },
        { id: 4, type: null, status: 'empty', timer: 0 },
        { id: 5, type: null, status: 'empty', timer: 0 },
        { id: 6, type: null, status: 'empty', timer: 0 }
    ],

    // Конфигурация культур (время роста, опыт, награда)
    cropsConfig: {
        wheat: { name: 'Пшеница', growthTime: 10, xpReward: 1, harvestYield: 2 }
    }
};
