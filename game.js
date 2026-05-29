class FarmGame {
    constructor() {
        this.state = window.gameState;
        this.init();
    }

    init() {
        this.render();
        // Запуск глобального таймера игры (1 тик = 1 секунда)
        setInterval(() => this.tick(), 1000);
    }

    // Обновление интерфейса на экране
    render() {
        document.getElementById('ui-coins').innerText = this.state.coins;
        document.getElementById('ui-xp').innerText = this.state.xp;
        document.getElementById('ui-level').innerText = this.state.level;
        document.getElementById('ui-silo').innerText = this.state.silo;
        document.getElementById('ui-silo-max').innerText = this.state.siloMax;

        const gridEl = document.getElementById('farm-grid');
        gridEl.innerHTML = '';

        this.state.plots.forEach(plot => {
            const plotEl = document.createElement('div');
            plotEl.className = `plot ${plot.status}`;

            if (plot.status === 'empty') {
                plotEl.innerHTML = `<b>Грядка</b><br>Пусто`;
                plotEl.onclick = () => this.plant(plot.id, 'wheat');
            } else if (plot.status === 'growing') {
                plotEl.innerHTML = `🌱<br><b>${this.state.cropsConfig[plot.type].name}</b><br>${plot.timer}с`;
            } else if (plot.status === 'ready') {
                plotEl.innerHTML = `🌾<br><b>Созрело!</b><br>Собрать`;
                plotEl.onclick = () => this.harvest(plot.id);
            }

            gridEl.appendChild(plotEl);
        });
    }

    // Посадка культуры
    plant(plotId, cropType) {
        if (this.state.seeds[cropType] <= 0) {
            alert('Нет семян для посадки!');
            return;
        }

        const plot = this.state.plots.find(p => p.id === plotId);
        const config = this.state.cropsConfig[cropType];

        plot.status = 'growing';
        plot.type = cropType;
        plot.timer = config.growthTime;
        
        this.state.seeds[cropType]--;
        this.state.silo = Math.max(0, this.state.silo - 1); // Семя берется из башни
        
        this.render();
    }

    // Сбор урожая
    harvest(plotId) {
        const plot = this.state.plots.find(p => p.id === plotId);
        const config = this.state.cropsConfig[plot.type];

        if (this.state.silo + config.harvestYield > this.state.siloMax) {
            alert('Силосная башня переполнена! Освободите место.');
            return;
        }

        this.state.silo += config.harvestYield;
        this.state.seeds[plot.type] += config.harvestYield;
        this.state.xp += config.xpReward;
        
        // Логика повышения уровня
        if (this.state.xp >= this.state.level * 10) {
            this.state.level++;
            alert(`🎉 Новый уровень: ${this.state.level}!`);
        }

        // Очищаем грядку
        plot.status = 'empty';
        plot.type = null;

        this.render();
    }

    // Покупка семян в магазине
    buySeeds() {
        if (this.state.coins < 5) {
            alert('Недостаточно монет!');
            return;
        }
        if (this.state.silo >= this.state.siloMax) {
            alert('Башня полна!');
            return;
        }

        this.state.coins -= 5;
        this.state.seeds.wheat += 1;
        this.state.silo += 1;
        this.render();
    }

    // Логика, выполняемая каждую секунду
    tick() {
        let changed = false;
        this.state.plots.forEach(plot => {
            if (plot.status === 'growing') {
                plot.timer--;
                changed = true;
                if (plot.timer <= 0) {
                    plot.status = 'ready';
                }
            }
        });
        if (changed) this.render();
    }
}

// Запуск игры при загрузке страницы
window.game = new FarmGame();
