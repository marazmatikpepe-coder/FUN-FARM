window.gameState = {
    // Ресурсы
    coins: 250, // Даем больше денег на старте для теста свиней и декора
    xp: 0,
    level: 1,
    
    // Вместимость складов
    silo: 2,     // Силосная башня (растения)
    siloMax: 50,
    barn: 0,     // Амбар (продукты животных, инструменты, декор)
    barnMax: 50,
    
    // Инвентарь Силосной башни
    seeds: { wheat: 2 },
    
    // Инвентарь Амбара
    barnInventory: {
        bacon: 0,
        axe: 2,      // Топоры для расчистки деревьев
        dynamite: 1  // Динамит для расчистки камней
    },

    // Инвентарь купленного декора (косметики)
    decorInventory: {
        flower_pot: 0,
        wooden_fence: 0
    },

    // Грядки
    plots: [
        { id: 1, type: null, status: 'empty', timer: 0 },
        { id: 2, type: null, status: 'empty', timer: 0 }
    ],

    // Территория (Препятствия для расчистки)
    territory: [
        { id: 1, type: 'tree', cleared: false, toolRequired: 'axe', rewardXp: 5 },
        { id: 2, type: 'stone', cleared: false, toolRequired: 'dynamite', rewardXp: 8 }
    ],

    // Загоны и Животные
    pigPen: {
        bought: false,
        maxPigs: 3,
        pigs: [] // Массив объектов свиней: { status: 'hungry'/'feeding'/'ready', timer: 0 }
    },

    // Размещенный на ферме декор (косметика)
    placedDecor: [],

    // Рынок / Доска заказов (как грузовик в Hay Day)
    orders: [
        { id: 1, require: { type: 'wheat', qty: 5 }, rewardCoins: 25, rewardXp: 5 },
        { id: 2, require: { type: 'bacon', qty: 2 }, rewardCoins: 80, rewardXp: 15 }
    ],

    // Конфигурации и цены магазина
    config: {
        crops: {
            wheat: { name: 'Пшеница', growthTime: 10, xpReward: 1, harvestYield: 2 }
        },
        animals: {
            pig: { name: 'Свинья', cost: 50, feedCostWheat: 2, produceTime: 20, product: 'bacon', xpReward: 4 }
        },
        shop: {
            pigPenCost: 100,
            axeCost: 15,
            dynamiteCost: 25
        },
        decor: {
            flower_pot: { name: 'Цветочный горшок 🌺', cost: 20 },
            wooden_fence: { name: 'Деревянный забор 🪵', cost: 15 }
        }
    }
};
