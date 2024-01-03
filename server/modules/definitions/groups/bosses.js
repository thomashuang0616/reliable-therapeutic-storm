const { combineStats, skillSet, makeAuto, addAura, LayeredBoss } = require('../facilitators.js');
const { base, gunCalcNames } = require('../constants.js');
const g = require('../gunvals.js');
require('./generics.js');

Class.minibossBase = {
    PARENT: ["genericTank"],
    TYPE: "miniboss",
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,
    }),
    LEVEL: 45,
    CONTROLLERS: ["nearestDifferentMaster", "canRepel"],
    FACING_TYPE: ['spin', {speed: 0.02}],
    HITS_OWN_TYPE: "hardOnlyBosses",
    BROADCAST_MESSAGE: "A visitor has left!",
    BODY: { PUSHABILITY: 0.05 }
}
Class.miniboss = {
    PARENT: ["minibossBase"],
    CONTROLLERS: ["nearestDifferentMaster", "minion", "canRepel"],
    AI: { NO_LEAD: true },
};
Class.ramMiniboss = {
    PARENT: ["minibossBase"],
    CONTROLLERS: ["nearestDifferentMaster", "canRepel", "mapTargetToGoal"],
};

// GUNS
Class.baseTrapTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, g.pounder, g.destroyer, { reload: 0.5 }, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            },
        },
    ],
}
Class.terrestrialTrapTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [13, 14, 1, 0, 0, 0, 0],
        }, {
            POSITION: [4, 14, 1.8, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, g.pounder, g.destroyer, { reload: 0.5 }, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            },
        },
    ],
}
Class.machineTripleTurret = {
    PARENT: ["genericTank"],
    LABEL: "Machine Gun",
    BODY: { FOV: 2 },
    CONTROLLERS: [ ["spin", {speed: 0.04}] ],
    INDEPENDENT: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        }, {
            POSITION: [12, 10, 1.4, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        }, {
            POSITION: [12, 10, 1.4, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        },
    ],
};
Class.skimmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Skimmer",
    BODY: { FOV: 2 * base.FOV },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer]),
                TYPE: "hypermissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        }, {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
        },
    ],
};
Class.twisterTurret = {
    PARENT: ["genericTank"],
    LABEL: "Twister",
    BODY: { FOV: 2 },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        }, {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "spinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.hyperTwisterTurret = {
    PARENT: ["genericTank"],
    LABEL: "Twister",
    BODY: { FOV: 2 },
    COLOR: -1,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        }, {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "hyperspinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.boomerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Boomer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: -1,
    GUNS: [
        {
            POSITION: [7.75, 10, 1, 12, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang, g.fake]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        }, {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
                TYPE: "boomerang",
            },
        },
    ],
};
Class.triTrapGuardTurret = {
    PARENT: ["genericTank"],
    COLOR: -1,
    CONTROLLERS: [["spin", { independent: true }]],
    GUNS: [],
};
for(let i = 0; i < 3; i++) {
    Class.triTrapGuardTurret.GUNS.push(
        {
            POSITION: [17, 8, 1, 0, 0, 120*i, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120*i+60, 0],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
};
Class.eliteSpinnerCyclone = {
    PARENT: ["genericTank"],
    COLOR: -1,
    CONTROLLERS: [["spin", { speed: 0.1, independent: true }]],
    GUNS: [],
};
for (let i = 0; i < 12; i++) {
    let delay;
    switch (i % 4) {
        case 0:
            delay = 0;
            break;
        case 1:
            delay = 0.5;
            break;
        case 2:
            delay = 0.25;
            break;
        case 3:
            delay = 0.75;
            break;
    }
    Class.eliteSpinnerCyclone.GUNS.push(
        {
            POSITION: [15, 3.5, 1, 0, 0, 30 * i, delay],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "bullet",
            },
        },
    )
};

// ELITE CRASHERS
Class.elite = {
    PARENT: ["miniboss"],
    LABEL: "Elite Crasher",
    COLOR: "pink",
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE,
    },
};
Class.eliteDestroyer = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Destroyer",
    UPGRADE_COLOR: "pink",
    GUNS: [
        {
            POSITION: [5, 16, 1, 6, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        }, {
            POSITION: [5, 16, 1, 6, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        }, {
            POSITION: [5, 16, 1, 6, 0, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [11, 0, 0, 180, 360, 0],
            TYPE: ["crasherSpawner"],
        }, {
            POSITION: [11, 0, 0, 60, 360, 0],
            TYPE: ["crasherSpawner"],
        }, {
            POSITION: [11, 0, 0, -60, 360, 0],
            TYPE: ["crasherSpawner"],
        }, {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: [ "bigauto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
};
Class.eliteGunner = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Gunner",
    UPGRADE_COLOR: "pink",
    FACING_TYPE: "toTarget",
    GUNS: [
        {
            POSITION: [14, 16, 1, 0, 0, 180, 0],
        }, {
            POSITION: [4, 16, 1.5, 14, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                TYPE: ["unsetPillbox", {MOTION_TYPE: "glide"}],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [6, 14, -2, 2, 0, 60, 0],
        }, {
            POSITION: [6, 14, -2, 2, 0, 300, 0],
        },
    ],
    AI: { NO_LEAD: false },
    TURRETS: [
        {
            POSITION: [14, 8, 0, 60, 180, 0],
            TYPE: ["auto4gun"],
        }, {
            POSITION: [14, 8, 0, 300, 180, 0],
            TYPE: ["auto4gun"],
        },
    ],
};
Class.eliteSprayer = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Sprayer",
    UPGRADE_COLOR: "pink",
    SKILL: [0, 9, 3, 9, 2, 9, 9, 9, 9, 0],
    AI: { NO_LEAD: false },
    HAS_NO_RECOIL: true,
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6, 0, 0, 0, 360, 1],
            TYPE: ["machineTripleTurret", { INDEPENDENT: true }],
        }, {
            POSITION: [9, 6, -5, 180, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        }, {
            POSITION: [9, 6, 5, 180, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        }, {
            POSITION: [9, 6, 5, 60, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        }, {
            POSITION: [9, 6, -5, 60, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        }, {
            POSITION: [9, 6, 5, -60, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        }, {
            POSITION: [9, 6, -5, -60, 130, 0],
            TYPE: ["sprayer", { COLOR: "grey" }],
        },
    ],
};
Class.eliteBattleship = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Battleship",
    UPGRADE_COLOR: "pink",
    GUNS: [
        {
            POSITION: [4, 6, 0.6, 7, -8, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 8, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, -8, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 8, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, -8, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 0, -60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 6, 0.6, 7, 8, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [5, 7, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [5, 7, 0, 120, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [5, 7, 0, 240, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
};
Class.eliteSpawner = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Spawner",
    UPGRADE_COLOR: "pink",
    MAX_CHILDREN: 9,
    AI: { STRAFE: false },
    GUNS: [
        {
            POSITION: [11, 16, 1, 0, 0, 60, 0],
        }, {
            POSITION: [11, 16, 1, 0, 0, 180, 0],
        }, {
            POSITION: [11, 16, 1, 0, 0, 300, 0],
        }, {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [2, 18, 1, 11, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.weak, { size: 0.5 }, {health: 0.1}]),
                TYPE: ["sentrySwarm", {GIVE_KILL_MESSAGE: false}],
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [2, 18, 1, 11, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.weak, { size: 0.5 }, {health: 0.1}]),
                TYPE: ["sentryTrap", {GIVE_KILL_MESSAGE: false}],
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [2, 18, 1, 11, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.weak, { size: 0.5 }, {health: 0.1}]),
                TYPE: ["sentryGun", {GIVE_KILL_MESSAGE: false}],
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["auto4gun", { INDEPENDENT: false, COLOR: -1 }],
        },
    ],
};
Class.eliteTrapGuard = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Trap Guard",
    UPGRADE_COLOR: "pink",
    AI: { STRAFE: false },
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9.5, 0, 0, 0, 360, 1],
            TYPE: "triTrapGuardTurret",
        },
    ],
};
for (let i = 0; i < 3; i++) {
    Class.eliteTrapGuard.GUNS.push(
        {
            POSITION: [10.5, 6, 1, 0, 0, 120*i+60, 0],
        }, {
            POSITION: [3, 6, 1.7, 10.5, 0, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
    Class.eliteTrapGuard.TURRETS.push(
        {
            POSITION: [5, 8, -7, 120*i+60, 160, 0],
            TYPE: ["autoTurret", { INDEPENDENT: false }],
        }, {
            POSITION: [5, 8, 7, 120*i+60, 160, 0],
            TYPE: ["autoTurret", { INDEPENDENT: false }],
        },
    )
};
Class.eliteSpinner = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Spinner",
    UPGRADE_COLOR: "pink",
    AI: { STRAFE: false },
    FACING_TYPE: ["spin", {speed: 0.1}],
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9.5, 0, 0, 0, 360, 1],
            TYPE: ["eliteSpinnerCyclone", {COLOR: -1}],
        },
    ],
};
for (let i = 0; i < 3; i++) {
    Class.eliteSpinner.GUNS.push(
        {
            POSITION: [9.5, 2, 1, -1.5, 11.5, 120*i+10, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [9.5, 2, 1, 3.5, 6.5, 120*i+10, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [9.5, 2, 1, 8.5, 1.5, 120*i+10, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [2, 20, 0.75, 8, 0, 120*i+60, 0],
        },
    )
};

// OLD ELITE
Class.oldEliteSprayer = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Elite Sprayer (Old)",
    UPGRADE_COLOR: "pink",
    AI: { NO_LEAD: false },
    TURRETS: [
        {
            POSITION: [14, 6, 0, 180, 190, 0],
            TYPE: [ "sprayer", { COLOR: -1 } ],
        }, {
            POSITION: [14, 6, 0, 60, 190, 0],
            TYPE: [ "sprayer", { COLOR: -1 } ],
        }, {
            POSITION: [14, 6, 0, -60, 190, 0],
            TYPE: [ "sprayer", { COLOR: -1 } ],
        },
    ],
};

// Legionary Crasher
Class.legionaryTwin = {
    PARENT: ["auto4gun"],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [17.5, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [17.5, 5, 1, 0, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.legionaryPillbox = {
    PARENT: ["unsetTrap"],
    LABEL: "Pillbox",
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "legionaryTwin",
        },
    ],
}
Class.legionaryCrasherTop = {
    PARENT: ["elite"],
    AI: { STRAFE: false, NO_LEAD: false },
    CONTROLLERS: [ ["spin", { independent: true, speed: -0.005 }] ],
    INDEPENDENT: true,
    GUNS: [],
    TURRETS: [],
}
for (let i = 0; i < 3; i++) {
    Class.legionaryCrasherTop.GUNS.push(
        {
            POSITION: [4, 9.5, 0.7, 7, 5, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.pounder, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, {size: 0.7, speed: 5, maxSpeed: 2, shudder: 5, range: 1.5}]),
                TYPE: [ "swarm", { INDEPENDENT: true } ],
                STAT_CALCULATOR: gunCalcNames.swarm,
                AUTOFIRE: true,
                
            },
        }, {
            POSITION: [4, 9.5, 0.7, 7, -5, 120*i+60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.pounder, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, {size: 0.7, speed: 5, maxSpeed: 2, shudder: 5, range: 1.5}]),
                TYPE: [ "swarm", { INDEPENDENT: true } ],
                STAT_CALCULATOR: gunCalcNames.swarm,
                AUTOFIRE: true,
            },
        },
    )
    Class.legionaryCrasherTop.TURRETS.push(
        {
            POSITION: [9.5, 10, 0, 120*i, 190, 0],
            TYPE: "auto4gun",
        },
    )
}
Class.legionaryCrasher = {
    PARENT: ["elite"],
    LABEL: "Legionary Crasher",
    UPGRADE_COLOR: "pink",
    AI: { STRAFE: false, NO_LEAD: false },
    HAS_NO_RECOIL: true,
    VALUE: 5e6,
    SIZE: 80,
    BODY: {
        FOV: 1.5,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 2000,
        DAMAGE: 5 * base.DAMAGE,
    },
    GUNS: [],
    TURRETS: [
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: "legionaryCrasherTop",
        }
    ],
}
for (let i = 0; i < 3; i++) {
    Class.legionaryCrasher.GUNS.push(
        {
            POSITION: [14.5, 13, 1, 0, 0, 120*i, 0],
        }, {
            POSITION: [3, 13, 1.7, 14.5, 0, 120*i, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, g.destroyer, { speed: 2.5 }, { size: 0.6, maxSpeed: 3 }]),
                TYPE: "legionaryPillbox",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
}
for (let i = 0; i < 3; i++) {
    Class.legionaryCrasher.GUNS.push(
        {
            POSITION: [5, 12, 1.6, -11, 0, 120*i, 0],
        }
    )
    Class.legionaryCrasher.TURRETS.push(
        {
            POSITION: [14, 8, 0, 120*i+60, 180, 0],
            TYPE: [ "sprayer", { COLOR: -1, } ],
        },
    )
}

Class.sprayerLegion = {
    PARENT: ["elite"],
    UPGRADE_LABEL: "Sprayer Legion",
    UPGRADE_COLOR: "pink",
    AI: { NO_LEAD: false },
    TURRETS: [
        {
            POSITION: [14, 6, 0, 180, 190, 0],
            TYPE: ["machineGun", {COLOR: -1}],
        }, {
            POSITION: [14, 6, 0, 60, 190, 0],
            TYPE: ["machineGun", {COLOR: -1}],
        }, {
            POSITION: [14, 6, 0, -60, 190, 0],
            TYPE: ["machineGun", {COLOR: -1}],
        },
    ],
};

// STRANGE BOSSES
Class.waferbread = {
    PARENT: ["sunchip"],
    NECRO: [0],
    SHAPE: 0
};
Class.sorcerer = {
    PARENT: ["miniboss"],
    LABEL: "Sorcerer",
    DANGER: 7,
    SHAPE: 0,
    COLOR: "veryLightGrey",
    UPGRADE_COLOR: "veryLightGrey",
    SIZE: 26,
    MAX_CHILDREN: 50,
    VALUE: 2e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.12 * base.SPEED,
        HEALTH: 6 * base.HEALTH,
        DAMAGE: 2 * base.DAMAGE,
    },
    GUNS: Array(2).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.machineGun, g.machineGunner, { size: 0.4, spray: 150, speed: 2, shudder: 1.75 }]),
            TYPE: "waferbread",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.summoner = {
    PARENT: ["miniboss"],
    LABEL: "Summoner",
    DANGER: 8,
    SHAPE: 4,
    COLOR: "gold",
    UPGRADE_COLOR: "gold",
    SIZE: 26,
    MAX_CHILDREN: 28,
    VALUE: 3e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.6 * base.DAMAGE,
    },
    GUNS: Array(4).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.8 }]),
            TYPE: ["sunchip"],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.dorito = {
    PARENT: ["sunchip"],
    NECRO: [3],
    SHAPE: 3
};
Class.enchantress = {
    PARENT: ["miniboss"],
    LABEL: "Enchantress",
    DANGER: 8,
    SHAPE: 3.5,
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    SIZE: 26,
    MAX_CHILDREN: 28,
    VALUE: 4e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.09 * base.SPEED,
        HEALTH: 10 * base.HEALTH,
        DAMAGE: 3 * base.DAMAGE,
    },
    GUNS: Array(3).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.9 }]),
            TYPE: "dorito",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.demonchip = {
    PARENT: ["sunchip"],
    NECRO: [5],
    SHAPE: 5
};
Class.exorcistor = {
    PARENT: ["miniboss"],
    LABEL: "Exorcistor",
    DANGER: 8,
    SHAPE: 5.5,
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SIZE: 26,
    MAX_CHILDREN: 20,
    VALUE: 5e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.08 * base.SPEED,
        HEALTH: 15 * base.HEALTH,
        DAMAGE: 4 * base.DAMAGE,
    },
    GUNS: Array(5).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 72, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer]),
            TYPE: "demonchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.realchip = {
    PARENT: ["sunchip"],
    NECRO: [6],
    SHAPE: 6
};
Class.shaman = {
    PARENT: ["miniboss"],
    LABEL: "Shaman",
    DANGER: 8,
    SHAPE: 6,
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    SIZE: 26,
    MAX_CHILDREN: 20,
    VALUE: 6e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.07 * base.SPEED,
        HEALTH: 20 * base.HEALTH,
        DAMAGE: 5 * base.DAMAGE,
    },
    GUNS: Array(6).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, { size: 1.1 }]),
            TYPE: "realchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
Class.eliteSkimmer = {
    PARENT: ["elite"],
    LABEL: "Elite Skimmer",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    TURRETS: [
        {
            POSITION: [15, 5, 0, 60, 170, 0],
            TYPE: "skimmerTurret",
        }, {
            POSITION: [15, 5, 0, 180, 170, 0],
            TYPE: "skimmerTurret",
        }, {
            POSITION: [15, 5, 0, 300, 170, 0],
            TYPE: "skimmerTurret",
        },
    ],
};

// Nesters
Class.nestKeeper = {
    PARENT: ["miniboss"],
    LABEL: "Nest Keeper",
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    MAX_CHILDREN: 15,
    VALUE: 3e5,
    GUNS: [
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [3.5, 6.65, 1.2, 8, 0, -35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        }, {
            POSITION: [3.5, 6.65, 1.2, 8, 0, -108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [8, 9, 0, 72, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [8, 9, 0, 0, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [8, 9, 0, 144, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [8, 9, 0, 216, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [8, 9, 0, -72, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "boomerTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
};
Class.nestWarden = {
    PARENT: ["miniboss"],
    LABEL: "Nest Warden",
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    VALUE: 3e5,
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "barricadeTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
};
for(let i = 0; i < 5; i++) {
    Class.nestWarden.GUNS.push(
        {
            POSITION: [10.7, 8, 1, 0, 0, 72*i+36, 0],
        }, {
            POSITION: [1.5, 8, 1.2, 10.7, 0, 72*i+36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { speed: 1.2 }, g.setTrap, g.constructor]),
                TYPE: "unsetTrap",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    );
    Class.nestWarden.TURRETS.push(
        {
            POSITION: [8, 9, 0, 72*i, 120, 0],
            TYPE: [ "cruiserTurret", { INDEPENDENT: true, COLOR: -1 } ],
        }
    );
};
Class.nestGuardian = {
    PARENT: ["miniboss"],
    LABEL: "Nest Guardian",
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    VALUE: 3e5,
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "twisterTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
};
for(let i = 0; i < 5; i++) {
    Class.nestGuardian.GUNS.push(
        {
            POSITION: [5.5, 7, 1, 6, 0, 72*i+36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    );
    Class.nestGuardian.TURRETS.push(
        {
            POSITION: [8, 9, 0, 72*i, 120, 0],
            TYPE: [ "swarmerTurret", { INDEPENDENT: true, COLOR: -1 } ],
        }
    );
};

// Rogues
Class.roguePalisade = {
    PARENT: ["miniboss"],
    LABEL: "Rogue Palisade",
    COLOR: "darkGrey",
    UPGRADE_COLOR: "darkGrey",
    SHAPE: 6,
    SIZE: 30,
    VALUE: 5e5,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
    BODY: {
        FOV: 1.4,
        SPEED: 0.05 * base.SPEED,
        HEALTH: 16 * base.HEALTH,
        SHIELD: 3 * base.SHIELD,
        DAMAGE: 3 * base.DAMAGE,
    },
    GUNS: [
        { POSITION: [4, 6, -1.6, 8, 0, 0, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 60, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 120, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 180, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 240, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 300, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pounder, { reload: 2 }, { reload: 2 } ]), TYPE: ["minion", {INDEPENDENT: true}], STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 3, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
    ],
    TURRETS: [
        { POSITION: [5, 10, 0, 30, 110, 0], TYPE: "baseTrapTurret" },
        { POSITION: [5, 10, 0, 90, 110, 0], TYPE: "baseTrapTurret" },
        { POSITION: [5, 10, 0, 150, 110, 0], TYPE: "baseTrapTurret" },
        { POSITION: [5, 10, 0, 210, 110, 0], TYPE: "baseTrapTurret" },
        { POSITION: [5, 10, 0, 270, 110, 0], TYPE: "baseTrapTurret" },
        { POSITION: [5, 10, 0, 330, 110, 0], TYPE: "baseTrapTurret" },
    ],
};
Class.rogueArmada = (() => {
    let SHAPE = 7,
        GUNS = [],
        TURRETS = [];
    for (let i = 0; i < SHAPE; i++) {
        for (let j = 0; j < 8; j++) {
            GUNS.push({
                POSITION: [8, 2 + Math.floor(j / 3), 1, 0, j / 2 - 2, (i + 0.5) * (360 / SHAPE), 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, {damage: 3}]),
                    TYPE: j % SHAPE < 2 ? "bullet" : "casing"
                }
            });
        }
        GUNS.push({
            POSITION: [8.5, 6, 1, 4, 0, (i + 0.5) * (360 / SHAPE), 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]),
                TYPE: "casing"
            }
        }, {
            POSITION: [7, 6, -1.6, 4, 0, (i + 0.5) * (360 / SHAPE), 0]
        });
    }
    for (let i = 0; i < SHAPE; i++) {
        TURRETS.push({
            POSITION: [5, 10, 0, i * 360 / SHAPE, 160, 0],
            TYPE: "shottrapTurret"
        });
    }
    return {
        PARENT: ["miniboss"],
        LABEL: 'Rogue Armada',
        COLOR: "darkGrey",
        UPGRADE_COLOR: "darkGrey",
        SHAPE,
        SIZE: 28,
        VALUE: 500000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 16,
            SHIELD: base.SHIELD * 3,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
        GUNS, TURRETS
    };
})();

// Bob.
Class.bob = {
    PARENT: ["ramMiniboss"],
    LABEL: "Bob",
    SHAPE: 0,
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    SIZE: 18,
    BODY: {
        FOV: 2,
        SPEED: 2 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 5 * base.DAMAGE,
        REGEN: 8 * base.REGEN,
        FOV: 0.5 * base.FOV,
        DENSITY: 6 * base.DENSITY,
    },
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        }, {
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody",
        }, {
            POSITION: [23.75, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",
        },
    ],
};
Class.nemesis = {
    PARENT: ["bob"],
    LABEL: "Nemesis",
    COLOR: "red",
    UPGRADE_COLOR: "red",
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 5,
    },
};

// DIEP BOSSES
Class.guardian = {
    PARENT: ["elite"],
    LABEL: "Guardian of the Pentagons",
    UPGRADE_LABEL: "Guardian",
    UPGRADE_COLOR: "pink",
    FACING_TYPE: "toTarget",
    GUNS: [
        {
            POSITION: [4, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { size: 0.5 }]),
                TYPE: "swarm",
                AUTOFIRE: true,
            },
        },
    ],
    AI: { NO_LEAD: false },
};
Class.defenderAutoTankGun = {
    PARENT: ["autoTankGun"],
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
                TYPE: ["bullet", {COLOR: "yellow"}],
            },
        },
    ],
};
Class.defender = {
    PARENT: ["elite"],
    LABEL: "Defender",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    GUNS: [
        {
            POSITION: [15, 7, 1, -3, 0, 60, 0],
        }, {
            POSITION: [3, 7, 1.7, 12, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                TYPE: ["trap", {COLOR: "yellow"}],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, -3, 0, 180, 0],
        }, {
            POSITION: [3, 7, 1.7, 12, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                TYPE: ["trap", {COLOR: "yellow"}],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, -3, 0, 300, 0],
        }, {
            POSITION: [3, 7, 1.7, 12, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                TYPE: ["trap", {COLOR: "yellow"}],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [5, 7, 0, 0, 190, 1],
            TYPE: "defenderAutoTankGun",
        }, {
            POSITION: [5, 7, 0, 120, 190, 1],
            TYPE: "defenderAutoTankGun",
        }, {
            POSITION: [5, 7, 0, 240, 190, 1],
            TYPE: "defenderAutoTankGun",
        },
    ],
    AI: { NO_LEAD: false },
};

// CELESTIALS
Class.terrestrial = {
    PARENT: ["miniboss"],
    LABEL: "Terrestrial",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 5e5,
    SHAPE: 7,
    SIZE: 35,
    BODY: {
        FOV: 1,
        HEALTH: 1000,
        SHIELD: 2,
        REGEN: base.REGEN * 0.1,
        SPEED: 0.75,
        DAMAGE: 9,
    },
};
Class.celestial = {
    PARENT: ["miniboss"],
    LABEL: "Celestial",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 1e6,
    SHAPE: 9,
    SIZE: 45,
    BODY: {
        FOV: 1,
        HEALTH: 1000,
        SHIELD: 2,
        REGEN: base.REGEN * 0.1,
        SPEED: 0.75,
        DAMAGE: 12,
    },
};
Class.rogueCelestial = {
    PARENT: ["celestial"],
    LABEL: "Rogue Celestial",
    COLOR: "darkGrey",
};
Class.eternal = {
    PARENT: ["miniboss"],
    LABEL: "Eternal",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 4e6,
    SHAPE: 11,
    SIZE: 90,
    BODY: {
        FOV: 1,
        HEALTH: 3000,
        SHIELD: 2,
        REGEN: base.REGEN * 0.1,
        SPEED: 0.75,
        DAMAGE: 18,
    },
};

// Terrestrials
Class.protoHive = {
    PARENT: ["bullet"],
    LABEL: "Proto-Hive",
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: "turnWithSpeed",
    INDEPENDENT: true,
    CONTROLLERS: ["alwaysFire", "nearestDifferentMaster", "targetSelf"],
    AI: { NO_LEAD: true },
    GUNS: [
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 9.5, 0.6, 7, 0, 120, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 9.5, 0.6, 7, 0, -120, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.protoSwarmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Swarmer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [10, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.hive]),
                TYPE: "protoHive",
            },
        }, {
            POSITION: [11, 12, 1, 5, 0, 0, 0],
        },
    ],
};
let ares = new LayeredBoss(null, "Ares", "terrestrial", 7, "purple", "terrestrialTrapTurret", 7, 5.5);
ares.addLayer({gun: {
    POSITION: [3.75, 7, 1.2, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, { speed: 0.5, maxSpeed: 0.5 }]),
        TYPE: ["demonchip", { INDEPENDENT: true, }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
    },
}}, false, null, 18);
ares.addLayer({turret: {
    POSITION: [10, 8.5, 0, null, 160, 0],
    TYPE: ["protoSwarmerTurret", { INDEPENDENT: true }],
}}, true, 6.5);

Class.swarmTurret = {
    PARENT: ["genericTank"],
    LABEL: "Swarm",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["swarm", {INDEPENDENT: true}],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.basicTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
};
let gersemi = new LayeredBoss(null, "Gersemi", "terrestrial", 7, "lightGreen", "terrestrialTrapTurret", 7, 5.5);
gersemi.addLayer({turret: {
    POSITION: [9, 8, 0, null, 160, 0],
    TYPE: ["swarmTurret", { INDEPENDENT: true }],
}});
gersemi.addLayer({turret: {
    POSITION: [9.5, 7.5, 0, null, 160, 0],
    TYPE: ["basicTurret", { INDEPENDENT: true }],
}}, true, 6.5);

let ezekiel = new LayeredBoss(null, "Ezekiel", "terrestrial", 7, "orange", "terrestrialTrapTurret", 7, 5.5);
ezekiel.addLayer({gun: {
    POSITION: [3.75, 7, 1.2, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, { speed: 0.5, maxSpeed: 0.5 }]),
        TYPE: ["dorito", { COLOR: "orange", INDEPENDENT: true, }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
    },
}}, true, null, 18);
ezekiel.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: ["skimmerTurret", { COLOR: "grey", INDEPENDENT: true }],
}}, true, 6.5)

let eris = new LayeredBoss(null, "Eris", "terrestrial", 7, "pink", "terrestrialTrapTurret", 7, 5.5);
eris.addLayer({gun: {
    POSITION: [3.75, 7, 1.2, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", { INDEPENDENT: true, COLOR: "pink", HAS_NO_RECOIL: true }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
    },
}}, false, null, 14);
eris.addLayer({turret: {
    POSITION: [10, 8.5, 0, null, 160, 0],
    TYPE: ["rocketeerTurret", { INDEPENDENT: true }],
}}, true, 6.5);

let selene = new LayeredBoss(null, "Selene", "terrestrial", 7, "gold", "terrestrialTrapTurret", 7, 5.5);
selene.addLayer({gun: {
    POSITION: [3.75, 7, 1.2, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, { speed: 0.5, maxSpeed: 0.5 }]),
        TYPE: ["sunchip", { COLOR: "gold", INDEPENDENT: true }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
    },
}}, true, null, 18);
selene.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: ["hyperTwisterTurret", { INDEPENDENT: true }],
}}, true, 6.5);

// PALADIN
Class.swarmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Swarmer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [14, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.hive]),
                TYPE: "hive",
            },
        }, {
            POSITION: [15, 12, 1, 5, 0, 0, 0],
        },
    ],
};
let paladin = new LayeredBoss(null, "Paladin", "celestial", 9, "purple", "baseTrapTurret", 6.5, 5.5);
paladin.addLayer({gun: {
    POSITION: [3.8, 6, 1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
        TYPE: ["demonchip", {INDEPENDENT: true}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.drone,
        WAIT_TO_CYCLE: true,
    },
}}, true, null, 16);
paladin.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "swarmerTurret",
}}, true, 6);

// FREYJA
Class.cruiserTurret = {
    PARENT: ["genericTank"],
    LABEL: "Cruiser",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
let freyja = new LayeredBoss(null, "Freyja", "celestial", 9, "lightGreen", "baseTrapTurret", 6.5, 5.5);
freyja.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 180, 0],
    TYPE: "cruiserTurret",
}});
freyja.addLayer({turret: {
    POSITION: [10.6, 7.5, 0, null, 160, 0],
    TYPE: "auto4gun",
}}, true, 6);

// ZAPHKIEL
let zaphkiel = new LayeredBoss(null, "Zaphkiel", "celestial", 9, "orange", "baseTrapTurret", 6.5, 5.5);
zaphkiel.addLayer({gun: {
    POSITION: [3.8, 6, 1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
        TYPE: ["drone", {INDEPENDENT: true,}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
zaphkiel.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: ["skimmerTurret", {COLOR: "grey", INDEPENDENT: true}],
}}, true, 6);

// NYX
Class.rocketeerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Rocketeer",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [10, 12.5, -0.7, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher, g.rocketeer]),
                TYPE: "rocketeerMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        }, {
            POSITION: [17, 18, 0.65, 0, 0, 0, 0],
        },
    ],
};
let nyx = new LayeredBoss(null, "Nyx", "celestial", 9, "pink", "baseTrapTurret", 6.5, 5.5);
nyx.addLayer({gun: {
    POSITION: [3.8, 7, -1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", {INDEPENDENT: true,}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
nyx.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "rocketeerTurret",
}}, true, 6);

// THEIA
let theia = new LayeredBoss(null, "Theia", "celestial", 9, "gold", "baseTrapTurret", 6.5, 5.5);
theia.addLayer({gun: {
    POSITION: [3.8, 6, 1.4, 8, 0, null, 1],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, { size: 0.5 }]),
        TYPE: ["summonerDrone", {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 35);
theia.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: ["twisterTurret", {COLOR: "grey"}],
}}, true, 6);

// ATLAS
Class.artilleryTurret = {
    PARENT: ["genericTank"],
    LABEL: "Artillery",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        }, {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        }, {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.nailgunTurret = {
    PARENT: ["genericTank"],
    LABEL: "Nailgun",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [20, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0],
        },
    ],
};
let atlas = new LayeredBoss(null, "Atlas", "celestial", 9, "lavender", "baseTrapTurret", 6.5, 5.5);
atlas.addLayer({turret: {
    POSITION: [7, 9, 0, null, 180, 0],
    TYPE: "artilleryTurret",
}});
atlas.addLayer({turret: {
    POSITION: [10.5, 8, 0, null, 160, 0],
    TYPE: "nailgunTurret",
}}, true, 6);

// RHEA
Class.crowbarTurret = {
    PARENT: ["genericTank"],
    LABEL: "Crowbar",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [37, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 38, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 28, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 18, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
};
Class.wrenchTurret = {
    PARENT: ["genericTank"],
    LABEL: "Wrench",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [{
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [67, 6.5, 1, 0, 0, 0, 0],
        }, {
            POSITION: [5, 8.5, -1.5, 8, 0, 0, 0],
        },
    ],
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 68, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 58, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        }, {
            POSITION: [6, 48, 0, 0, 360, 1],
            TYPE: [ "autoTankGun", { INDEPENDENT: true, HAS_NO_RECOIL: true } ],
        },
    ],
};
let rhea = new LayeredBoss(null, "Rhea", "celestial", 9, "darkGrey", "baseTrapTurret", 6.5, 5.5);
rhea.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 180, 0],
    TYPE: "wrenchTurret",
}});
rhea.addLayer({turret: {
    POSITION: [10.5, 8, 0, null, 160, 0],
    TYPE: "crowbarTurret",
}}, true, 6);

// JULIUS
Class.juliusDrone = {
    PARENT: ["eggchip"],
    NECRO: false,
};
Class.launcherTurret = {
    PARENT: ["genericTank"],
    LABEL: "Launcher",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        }, {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.juliusLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 3,
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.sunchip]),
                TYPE: "juliusDrone",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
let julius = new LayeredBoss(null, "Julius", "celestial", 9, "darkGrey", "baseTrapTurret", 6.5, 5.5);
julius.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 180, 0],
    TYPE: "juliusLowerTurret",
}});
julius.addLayer({turret: {
    POSITION: [10.5, 8, 0, null, 160, 0],
    TYPE: "launcherTurret",
}}, true, 6);

// GENGHIS
Class.tinyMinion = {
    PARENT: ["minion"],
    LABEL: "Tiny Minion",
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * 0.5,
        DAMAGE: 2.25,
        RESIST: 1.6,
        RANGE: 300,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    AI: { BLIND: true },
    GUNS: [
        {
            POSITION: [17, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.lowPower]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            }, 
        },
    ],
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
}
Class.genghisLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 4,
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 11, 0.6, 6, 0, 0, 0.5],
        }, {
            POSITION: [2, 12, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, { reload: 1.5 }]),
                TYPE: ["tinyMinion", {INDEPENDENT: true}],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
let genghis = new LayeredBoss(null, "Genghis", "celestial", 9, "darkGrey", "baseTrapTurret", 6.5, 5.5);
genghis.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 180, 0],
    TYPE: "genghisLowerTurret",
}});
genghis.addLayer({turret: {
    POSITION: [10.5, 8, 0, null, 160, 0],
    TYPE: "auto4gun",
}}, true, 6);

// NAPOLEON
Class.napoleonLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [8, 8, 0.6, 6, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [8, 8, 0.6, 6, 0, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.turretedBullet = makeAuto('bullet', "Auto-Bullet", {size: 14, color: "veryLightGrey", angle: 0});
Class.napoleonUpperTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [12, 17, -0.6, 0, 0, 0, 0],
        }, {
            POSITION: [16, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { speed: 0.93, maxSpeed: 0.93 }]),
                TYPE: ["turretedBullet", {COLOR: "veryLightGrey"}],
            },
        },
    ],
};
let napoleon = new LayeredBoss(null, "Napoleon", "celestial", 9, "darkGrey", "baseTrapTurret", 6.5, 5.5);
napoleon.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 180, 0],
    TYPE: "napoleonLowerTurret",
}});
napoleon.addLayer({turret: {
    POSITION: [10.5, 8, 0, null, 160, 0],
    TYPE: "napoleonUpperTurret",
}}, true, 6)

// Eternals
Class.kronosMissile = {
    PARENT: ["missile"],
    GUNS: [
        {
            POSITION: [4, 8, 1.5, 14, 0, 90, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.trap, { range: 0.5 }, {reload: 3}]),
                TYPE: [ "trap", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [4, 8, 1.5, 14, 0, -90, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.trap, { range: 0.5 }, {reload: 3}]),
                TYPE: [ "trap", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [14, 6, 1, 0, -2, 150, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        }, {
            POSITION: [14, 6, 1, 0, 2, 210, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        }, {
            POSITION: [14, 8, 1, 0, 0, 90, 0],
        }, {
            POSITION: [14, 8, 1, 0, 0, -90, 0],
        },
    ],
};
Class.kronosSkimmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Skimmer",
    BODY: { FOV: 10 },
    COLOR: "grey",
    INDEPENDENT: true,
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    GUNS: [
        {
            POSITION: [8, 20, -0.25, 11, 0, 0, 0],
        }, {
            POSITION: [15, 18, -0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { reload: 2 }]),
                TYPE: "kronosMissile",
            },
        },
    ],
};
Class.carrierTurret = {
    PARENT: ["genericTank"],
    LABEL: "Carrier",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [7, 8, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 8, 0.6, 7, 2, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [7, 8, 0.6, 7, -2, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier, g.pounder, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.tripletTurret = {
    PARENT: ["genericTank"],
    LABEL: "Triplet",
    BODY: { FOV: 2 },
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [18, 10, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18, 10, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [21, 10, 1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet",
            },
        },
    ],
};
let kronos = new LayeredBoss(null, "Kronos", "eternal", 11, "veryLightGrey", "baseTrapTurret", 6, 5.5);
kronos.addLayer({turret: {
    POSITION: [6.5, 9, 0, null, 160, 0],
    TYPE: "kronosSkimmerTurret",
}});
kronos.addLayer({turret: {
    POSITION: [6.5, 9, 0, null, 160, 0],
    TYPE: "carrierTurret",
}}, true, 4);
kronos.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 160, 0],
    TYPE: "tripletTurret",
}}, true, 4);

Class.autoSmasherMissile = {
    PARENT: ["missile"],
    LABEL: "Auto-Smasher",
    HITS_OWN_TYPE: "never",
    BODY: {
        FOV: 1.05 * base.FOV,
        DENSITY: 2 * base.DENSITY,
    },
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        }, {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["auto4gun", { INDEPENDENT: true }],
        },
    ],
}
Class.autosmashTurret = {
    PARENT: ["genericTank"],
    LABEL: "Launcher",
    BODY: { FOV: 10 },
    COLOR: "grey",
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [4, 12, 1.2, 16, 0, 0, 0],
        }, {
            POSITION: [18, 20, -0.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { reload: 2 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, {range: 2.5}]),
                TYPE: "autoSmasherMissile",
            },
        },
    ],
};
Class.gunnerCruiserTurret = {
    PARENT: ["genericTank"],
    LABEL: "Launcher",
    BODY: { FOV: 10 },
    COLOR: "grey",
    CONTROLLERS: [ "canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster" ],
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [4, 7.5, 0.6, 6, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [4, 7.5, 0.6, 6, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [16, 3, 1, 0, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [16, 3, 1, 0, 3, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.gemDrone = {
    PARENT: ["drone"],
    COLOR: "teal",
    DRAW_HEALTH: true,
    SHAPE: 6,
    INDEPENDENT: true,
    BODY: {
        PUSHABILITY: 0.3,
        HEALTH: 0.3*5,
        DAMAGE: 3.375/5,
        SPEED: 1,
        DENSITY: 0.1,
        RESIST: 3,
        FOV: 100,
    },
}
let odin = new LayeredBoss(null, "Odin", "eternal", 11, "teal", "baseTrapTurret", 4.5, 3.5);
odin.addLayer({gun: {
    POSITION: [2.25, 3.25, -1.6, 9, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }, g.pounder, {size: 1.7}]),
        TYPE: ["gemDrone", {INDEPENDENT: true,}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 18);
odin.addLayer({turret: {
    POSITION: [7, 8, 0, null, 160, 0],
    TYPE: "autosmashTurret",
}}, true, 5.5);
odin.addLayer({turret: {
    POSITION: [8, 9, 0, null, 160, 0],
    TYPE: "gunnerCruiserTurret",
}}, true, 4.5);

// Developer Bosses
Class.taureonCoreBase = {
    SHAPE: 4,
    COLOR: '#00A2E8'
};
Class.taureonCore = {
    PARENT: "genericTank",
    LABEL: "Core Turret",
    SHAPE: 4.5,
    COLOR: '#99D9EA',
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [10, 14, -0.5, 14, 0, 0, 0]
    },{
        POSITION: [21, 15, -1.1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.destroyer, g.sniper]),
            TYPE: "snake",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT2, 0, 0, 0, 0, 0],
        TYPE: "taureonCoreBase"
    }]
};
Class.taureonBase = {
    SHAPE: 4.5,
    COLOR: '#161B54',
    MIRROR_MASTER_ANGLE: true
};
let d = 1/4;
Class.taureonStar = {
    SHAPE: [[0,1],[d,d],[1,0],[d,-d],[0,-1],[-d,-d],[-1,0],[-d,d]],
    COLOR: '#3F48CC',
    MIRROR_MASTER_ANGLE: true
};
Class.taureonRailgunTurret = {
    PARENT: "genericTank",
    LABEL: "Railgun Turret",
    CONTROLLERS: ["nearestDifferentMaster", "onlyAcceptInArc"],
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [20, 7, 1, 0, 0, 0, 0]
    },{
        POSITION: [24, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroyer, { speed: 2.5 }, { speed: 2.5 }]),
            TYPE: "bullet"
        }
    },{
        POSITION: [5, 7.5, -1.6, 8, 0, 0, 0],
    }]
};
Class.taureonThruster = {
    PARENT: "genericTank",
    LABEL: "Thruster",
    CONTROLLERS: ["onlyAcceptInArc"],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun, g.thruster, { speed: 0.5, maxSpeed: 0.5 }, { speed: 0.5, maxSpeed: 0.5 }, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun, g.thruster, { speed: 0.5, maxSpeed: 0.5 }, { speed: 0.5, maxSpeed: 0.5 }]),
            TYPE: "bullet"
        },
    }]
};
Class.taureonMissile = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    TYPE: "swarm",
    MOTION_TYPE: "swarm",
    FACING_TYPE: "smoothWithMotion",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    INDEPENDENT: true,
    BODY: {
        FOV: base.FOV * 2
    },
    TURRETS: [{/** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: "genericTank",
    }],
    GUNS: [{/* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.4, 8, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.1 }]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
        }
    },{
        POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
        PROPERTIES: {
            AUTOFIRE: true,
            NEGATIVE_RECOIL: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.1 }]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }]
        }
    },...Array(16).fill().map((_, i)=>({
        POSITION: [0, (i % 4) + 1, 0, 0, 0, 0, 9999],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, { spray: 1e6, recoil: 0, range: 0.5 }]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            SHOOT_ON_DEATH: true
        },
    }))]
};
Class.taureonBoss = {
    PARENT: "miniboss",
    LABEL: "Diamond Marauder",
    NAME: "Taureon",
    COLOR: '#2B339B',
    UPGRADE_COLOR: "spaceGem",
    DANGER: 10,
    SHAPE: 4.5,
    SIZE: 50,
    FACING_TYPE: "smoothToTarget",
    VALUE: 5e6,
    BODY: {
        FOV: 1,
        SPEED: 0.5 * base.SPEED,
        HEALTH: 20 * base.HEALTH,
        DAMAGE: 3 * base.DAMAGE,
    },
    TURRETS: [{
        POSITION: [23.3, 0, 0, 0, 0, 0],
        TYPE: "taureonBase"
    },{
        POSITION: [5, 10, 0, -45, 180, 0],
        TYPE: "taureonRailgunTurret"
    },{
        POSITION: [5, 10, 0, 45, 180, 0],
        TYPE: "taureonRailgunTurret"
    },{
        POSITION: [5, -10, 0, -45, 90, 0],
        TYPE: "taureonThruster"
    },{
        POSITION: [5, -10, 0, 45, 90, 0],
        TYPE: "taureonThruster"
    },{
        POSITION: [25, 0, 0, 0, 0, 1],
        TYPE: "taureonStar"
    },{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "taureonCore"
    }],
    GUNS: [...Array(6).fill().map((_, i) => ({
        POSITION: [18, 1.75, 1, 0, Math.cos(Math.PI * i / 3) * 2, 0, i / 6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin]),
            TYPE: "bullet"
        }
    })),{
        POSITION: [4, 5, -0.5, 12, 0, -90, 0]
    },{
        POSITION: [10, 5, -1.2, 5, 0, -90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
            TYPE: "taureonMissile",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    },{
        POSITION: [4, 5, -0.5, 12, 0, 90, 0]
    },{
        POSITION: [10, 5, -1.2, 5, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
            TYPE: "taureonMissile",
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    },{
        POSITION: [5.5, 5, -1.5, 5, 0, -45, 0]
    },{
        POSITION: [5.5, 5, -1.5, 5, 0, 45, 0]
    },{
        POSITION: [2, 7, 1, 8, 0, 0, 0]
    },{
        POSITION: [2, 7, 1, 14.5, 0, 0, 0]
    }]
};

Class.shinyomegasunchip = {
    PARENT: ["drone"],
    SHAPE: 4,
    HITS_OWN_TYPE: "hard",
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 45, 0, 1],
        TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    },{
        POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 0, 0, 1],
        TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    },{
        POSITION: [20 * Math.SQRT1_2 ** 3, 0, 0, 45, 0, 1],
        TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    }]
};
Class.shinyEggDummy = {
    SHAPE: 0,
    COLOR: "lightGreen"
}
Class.shinybetawaferbread = {
    PARENT: ["drone"],
    SHAPE: 0,
    HITS_OWN_TYPE: "hard",
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    TURRETS: [{
        POSITION: [10, 0, 0, 45, 0, 1],
        TYPE: "shinyEggDummy"
    },]
};;
Class.zenphiaBoss = {
    PARENT: "miniboss",
    LABEL: "Shiny Omega Thaumaturge",
    NAME: "Zenphia",
    DANGER: 10,
    SHAPE: 4,
    COLOR: "lightGreen",
    UPGRADE_COLOR: "lightGreen",
    SIZE: 50,
    VALUE: 5e6,
    BODY: {
        FOV: 0.75,
        SPEED: 0.05 * base.SPEED,
        HEALTH: 15 * base.HEALTH,
        DAMAGE: 5 * base.DAMAGE,
    },
    GUNS: Array(4).fill().map((_, i) => ([{
        POSITION: [2.5, 3, 1.2, 8, 5, i * 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.pounder, { speed: 2.5 }, g.machineGun, { spray: 50, speed: 1.25, shudder: 1.25 }]),
            TYPE: "shinybetawaferbread",
            MAX_CHILDREN: 8,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    },{
        POSITION: [2.5, 3, 1.2, 8, -5, i * 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.pounder, { speed: 2.5 }, g.machineGun, { spray: 150, speed: 1.25, shudder: 1.25 }]),
            TYPE: "shinybetawaferbread",
            MAX_CHILDREN: 8,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    },{
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, g.destroyer, { speed: 2.5 }, { maxSpeed: 3 }]),
            TYPE: "shinyomegasunchip",
            MAX_CHILDREN: 4,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }])).flat(),
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 45, 0, 1],
        TYPE: "shinySquare"
    },{
        POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 0, 0, 1],
        TYPE: "shinySquare"
    },{
        POSITION: [20 * Math.SQRT1_2 ** 3, 0, 0, 45, 0, 1],
        TYPE: "shinySquare"
    }]
};

Class.dogeiscutBody = {
    PARENT: "genericTank",
    SHAPE: [[1,0],[-0.7,0.7],[-0.35,0],[-0.7,-0.7]]
}
Class.dogeiscutTurret = {
    PARENT: "genericTank",
    GUNS: [ {
            POSITION: [ 50, 5, 2.5, 0, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.minigun, {reload: 0.1}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [ 18, 8, -2, 0, 0, 0, 0, ],
        }, 
    ],
    TURRETS: [
        {
            POSITION: [16, 0, 0, 0, 360, 1],
            TYPE: ["genericTank",  { MIRROR_MASTER_ANGLE: true, COLOR: "#f6c6a2"}],
        },
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: ["genericTank",  { MIRROR_MASTER_ANGLE: true, COLOR: "pink"}],
        },
    ]
}
function createDogeiscutMissileTurret(color) {
    return {
        PARENT: "genericTank",
        GUNS: [ {
                POSITION: [ 15, 8, 2.5, 0, 0, 180, 0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.skimmer,
                        { reload: 0.5 },
                        g.lowPower,
                        { recoil: 1.35 },
                        { speed: 1.3, maxSpeed: 1.3 },
                        { speed: 1.3, maxSpeed: 1.3 },
                        {reload: 0.15, recoil: 1, range: 0.1}]),
                    TYPE: ["bullet", 
                        {
                        PERSISTS_AFTER_DEATH: true,
                        COLOR: color
                        },
                    ],
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                },
            },
        ],
    }
}
function createDogeiscutMissile(color) {
    return {
        PARENT: "bullet",
        LABEL: color + " Missile",
        COLOR: color,
        GUNS: [...Array(11).fill().map((_, i)=>({
            POSITION: [0, 8, 0, 0, 0, ((360) / 11)*i, 9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.noSpread, { recoil: 0, range: 0.4, damage: 2.5, density: 30 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true, COLOR: color }],
                SHOOT_ON_DEATH: true,
            },
        }))],
        TURRETS: [
            {
                POSITION: [16, 0, 0, 0, 360, 1],
                TYPE: ["dogeiscutMissileTurret_" + color],
            },
            {
                POSITION: [12, 0, 0, 0, 360, 1],
                TYPE: ["genericTank"],
            }
        ]
    }
}
Class.dogeiscutMissileTurret_red = createDogeiscutMissileTurret('red')
Class.dogeiscutMissile_red = createDogeiscutMissile('red')
Class.dogeiscutMissileTurret_orange = createDogeiscutMissileTurret('orange')
Class.dogeiscutMissile_orange = createDogeiscutMissile('orange')
Class.dogeiscutMissileTurret_yellow = createDogeiscutMissileTurret('yellow')
Class.dogeiscutMissile_yellow = createDogeiscutMissile('yellow')
Class.dogeiscutMissileTurret_green = createDogeiscutMissileTurret('green')
Class.dogeiscutMissile_green = createDogeiscutMissile('green')
Class.dogeiscutMissileTurret_cyan = createDogeiscutMissileTurret('cyan')
Class.dogeiscutMissile_cyan = createDogeiscutMissile('cyan')
Class.dogeiscutMissileTurret_blue = createDogeiscutMissileTurret('blue')
Class.dogeiscutMissile_blue = createDogeiscutMissile('blue')
Class.dogeiscutMissileTurret_purple = createDogeiscutMissileTurret('purple')
Class.dogeiscutMissile_purple = createDogeiscutMissile('purple')
Class.dogeiscutBomb = {
        PARENT: "trap",
        LABEL: "Bomb",
        SHAPE: 0,
        GUNS: [...Array(32).fill().map((_, i)=>({
            POSITION: [0, 8, 0, 0, 0, ((360) / 32)*i, 9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.noSpread, { recoil: 0, range: 0.4, damage: 2.5, size: 0.5}]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            },
        })),...Array(10).fill().map((_,i)=>({
            POSITION: [12, 3.5, 1, 0, 0, (360/10)*i, (i%3)/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.cyclone,
                    {reload: 3}
                ]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
            }))
        ],
        TURRETS: [
            {
                POSITION: [8, 0, 0, 0, 360, 1],
                TYPE: ["genericTank"],
            }
        ]
    }
Class.dogeiscutBoss = {
    PARENT: "miniboss",
    LABEL: "DOG",
    NAME: "DogeisCut",
    DANGER: 10,
    FACING_TYPE: "smoothToTarget",
    SHAPE: [[1,0],[-0.7,0.7],[-0.35,0],[-0.7,-0.7]],
    COLOR: "yellow",
    UPGRADE_COLOR: "yellow",
    SIZE: 50,
    VALUE: 5e6,
    BODY: {
        FOV: 0.75,
        SPEED: 0.25 * base.SPEED,
        HEALTH: 14 * base.HEALTH,
        DAMAGE: 4 * base.DAMAGE,
    },
    GUNS: [ {
            POSITION: [ 6, 8, 1.5, 3, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, {size: 1, reload: 3, recoil: 5}]),
                TYPE: ["dogeiscutBomb"],
                STAT_CALCULATOR: gunCalcNames.sustained,
            }
        }, {
            POSITION: [ 4, 4, 1.5, 3, 0, 180, 0, ],
            PROPERTIES: {
                COLOR: "black"
            }
        }, 
        
        {
            POSITION: [ 1, 2, 1, 4, -8, 68, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_red"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'red'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, -5.333, 68, 1/7, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_orange"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'orange'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, -2.666, 68, (1/7)*2, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_yellow"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'yellow'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 0, 68, (1/7)*3, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_green"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'green'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 2.666, 68, (1/7)*4, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_cyan"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'cyan'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 5.333, 68, (1/7)*5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_blue"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'blue'
            }
        }, {
        POSITION: [ 1, 2, 1, 4, 8, 68, (1/7)*6, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_purple"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'purple'
            }
        }, 
        
        
        {
        POSITION: [ 1, 2, 1, 4, 8, -68, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_red"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'red'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 5.333, -68, 1/7, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_orange"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'orange'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 2.666, -68, (1/7)*2, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_yellow"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'yellow'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, 0, -68, (1/7)*3, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_green"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'green'
            }
        }, {
        POSITION: [ 1, 2, 1, 4, -2.666, -68, (1/7)*4, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_cyan"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'cyan'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, -5.333, -68, (1/7)*5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_blue"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'blue'
            }
        }, {
            POSITION: [ 1, 2, 1, 4, -8, -68, (1/7)*6, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder, {speed: 3, range: 0.8, reload: 4}]),
                TYPE: ["dogeiscutMissile_purple"],
                STAT_CALCULATOR: gunCalcNames.sustained,
                COLOR: 'purple'
            }
        },
    ],
    TURRETS: [
        {
            POSITION: [16, 0, 0, 0, 360, 1],
            TYPE: ["dogeiscutBody",  { MIRROR_MASTER_ANGLE: true, COLOR: "#f6c6a2"}],
        },
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: ["dogeiscutBody",  { MIRROR_MASTER_ANGLE: true, COLOR: "pink"}],
        },
        {
            POSITION: [5, 0, 0, 0, 360, 1],
            TYPE: ["dogeiscutTurret",  { INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"], COLOR: "yellow" }],
        },
        {
            POSITION: [1, 10.5, 0, 0, 360, 0],
            TYPE: ["genericTank",  {COLOR: "black"}],
        },
    ]
}
Class.trplnrBossAuraBulletAura = addAura(1, 1)
Class.trplnrBossAuraBullet = {
    PARENT: 'genericTank',
    LABEL: 'Nest',
    SHAPE: -4,
    PERSISTS_AFTER_DEATH: true,
    BODY: {
        HEALTH: 100,
    },
    SIZE: 25,
    COLOR: '#F49EFF',
    GLOW: {
        STRENGTH: 25,
        COLOR: -1,
        ALPHA: 1
    },
    DRAW_HEALTH: true,
    GUNS: (() => {
        let output = []
        for (let i = 0; i < 4; i++) {
            output.push({
                POSITION: { ANGLE: (360/4)*i, ASPECT: -0.35, X: -5 },
                PROPERTIES: {
                    COLOR: 'white',
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { size: 0.8 }, {reload: 0.8, damage: 1.25}]),
                    TYPE: 'autoswarm',
                    AUTOFIRE: true,
                },
            })
        }
        return output
    })(),
    TURRETS: [
        {
            POSITION: {SIZE: 10, LAYER: 1},
            TYPE: "trplnrBossAuraBulletAura"
        }
    ]
}
const trplnrBossDecor = {
    COLOR: '#F49EFF',
    UPGRADE_COLOR: "lavender",
    LABEL: 'Lavender',
    NAME: 'Trioplane',
    SHAPE: 3,
    SIZE: 25,
    VALUE: 5e9,
    DANGER: 10,
    GLOW: {
        RADIUS: 15,
        COLOR: -1,
        ALPHA: 1,
        RECURSION: 5
    },
    TURRETS: [{
        POSITION: { SIZE: 25 ** Math.SQRT1_2, ANGLE: 180, LAYER: 1 },
        TYPE: ['triangle', { COLOR: 'black', MIRROR_MASTER_ANGLE: true }]
    }, {
        POSITION: { SIZE: 25 ** Math.SQRT1_2, LAYER: 1 },
        TYPE: ['triangle', { COLOR: -1, MIRROR_MASTER_ANGLE: true }]
    }, {
        POSITION: { SIZE: 25 },
        TYPE: ['triangle', { COLOR: 'black', MIRROR_MASTER_ANGLE: true }]
    }],
}
Class.trplnrBoss = {
    PARENT: "miniboss",
    ...trplnrBossDecor,
    BODY: {
        HEALTH: 500,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body, gun }) => {
                if (gun.identifier != 'onHandler') return
                const messages = [
                    'Attack my little swarms!',
                    'Deploying, Attack swarms',
                    'You really think you can defeat me? Heres a little challenge for you.',
                    'This thing is really gonna annoy you HAHA!',
                    'I don\'t know what to say uhhh, die i guess.'
                ]
                body.sendMessage(messages[Math.floor(Math.random() * messages.length)])
                body.sendMessage('Lavender will turn into `BULL3T HELL F0rM`, Run!')
                for (let i = 0; i < 24; i++) {
                    i < 12 ?
                        setTimeout(() => { body.SIZE /= 1.1; body.alpha /= 1.2 }, i * 50)
                        :
                        setTimeout(() => { body.SIZE *= 1.1; body.alpha *= 1.2 }, i * 50)
                }
                setTimeout(() => {
                    let range = 500
                    let whereToGoX = Math.random() > 0.5 ? Math.floor(Math.random() * -range) : Math.floor(Math.random() * range)
                    let whereToGoY = Math.random() > 0.5 ? Math.floor(Math.random() * -range) : Math.floor(Math.random() * range)
                    body.x += whereToGoX
                    body.y += whereToGoY
                }, 12 * 50);
                setTimeout(() => body.define('trplnrBossBulletHellForm'), 24 * 50)
            }
        }
    ],
    GUNS: (() => {
        let output = []
        for (let i = 0; i<2; i++) {
            output.push({
                POSITION: { WIDTH: 10, X: -5, ASPECT: -0.7, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: 'white',
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 100}]),
                    TYPE: "trplnrBossAuraBullet",
                    INDEPENDENT_CHILDREN: true,
                }
            })
        }
        output.push({
            POSITION: { WIDTH: 10, X: -5, ASPECT: -0.7, ANGLE: ((360 / 3) * 2) - 180 },
            PROPERTIES: {
                COLOR: 'white',
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 100}]),
                TYPE: "trplnrBossAuraBullet",
                INDEPENDENT_CHILDREN: true,
                IDENTIFIER: 'onHandler'
            }
        })
        for (let i = 0; i < 3; i++) {
            output.push({
                POSITION: { WIDTH: 5, ASPECT: -0.7, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: 'black'
                }
            })
            output.push({
                POSITION: { WIDTH: 5, HEIGHT: 5, X: -30, ASPECT: 0, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: 'black'
                }
            }, {
                POSITION: { WIDTH: 5, HEIGHT: 5, X: -25, ASPECT: 0, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: 'white'
                }
            })
        }
        return output
    })()
}

Class.trplnrBossBulletHellFormPentagonsAuraBullet = {
    PARENT: 'bullet',
    TURRETS: [{
        POSITION: {SIZE: 15, LAYER: 1},
        TYPE: "trplnrBossAuraBulletAura"
    }]
} 

Class.trplnrBossBulletHellFormPentagons = {
    PARENT: 'bullet',
    LABEL: 'Pentagon',
    SHAPE: -5,
    TURRETS: [{
        POSITION: { SIZE: 40 ** Math.SQRT1_2, ANGLE: 180, LAYER: 1 },
        TYPE: ['pentagon', {COLOR: 'black', MIRROR_MASTER_ANGLE: true}]
    }],
    GUNS: (() => {
        let output = []
        for (let i = 0; i < 5; i++) {
            output.push({
                POSITION: { WIDTH: 10, HEIGHT: 10, ANGLE: ((360/5)*i) - 180, DELAY: 1 },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {reload: 0.8}]),
                    TYPE: 'trplnrBossBulletHellFormPentagonsAuraBullet',
                    AUTOFIRE: true,
                    COLOR: 'white'
                }
            })
        }
        return output
    })()
}
Class.trplnrBossBulletHellForm = {
    PARENT: "miniboss",
    ...trplnrBossDecor,
    LABEL: 'Lavender - Bullet Hell Form',
    BODY: {
        HEALTH: 500,
    },
    ON: [
        {
            event: "fire",
            handler: ({ body, masterStore, gun }) => {
                if (gun.identifier != 'onHandler') return
                masterStore.shotsFired ??= 0
                masterStore.shotsFired++

                for (let i = 0; i < 24; i++) {
                    i < 12 ?
                        setTimeout(() => { body.SIZE /= 1.1; body.alpha /= 1.2 }, i * 50)
                        :
                        setTimeout(() => { body.SIZE *= 1.1; body.alpha *= 1.2 }, i * 50)
                }
                setTimeout(() => {
                    let range = 500
                    let whereToGoX = Math.random() > 0.5 ? Math.floor(Math.random() * -range) : Math.floor(Math.random() * range)
                    let whereToGoY = Math.random() > 0.5 ? Math.floor(Math.random() * -range) : Math.floor(Math.random() * range)
                    body.x += whereToGoX
                    body.y += whereToGoY
                }, 12 * 50)

                if (masterStore.shotsFired > 5) {
                    body.define('trplnrBossVulnerableForm')
                    const messages = [
                        'I\'m a little tired right now',
                        'Ouch my leg!',
                        'i sleep',
                        'Bruh my keyboard isn\'t working',
                        'Omg bruh I chose the wrong form'
                    ]
                    body.sendMessage(messages[Math.floor(Math.random() * messages.length)])
                    body.sendMessage('Lavender is in its `VULN3RABLE F0RM`, Attack!')
                }
            }
        }
    ],
    GUNS: (() => {
        let output = []
        for (let i = 0; i<3; i++) {
            output.push({
                POSITION: { WIDTH: 15, HEIGHT: 5, ANGLE: ((360 / 3) * i)-180, ASPECT: 0, X: -25 },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, { reload: 1 }]),
                    TYPE: 'trplnrBossBulletHellFormPentagonsAuraBullet',
                    COLOR: 'black'
                }
            }, {
                POSITION: { WIDTH: 15, HEIGHT: 5, ANGLE: ((360 / 3) * i)-180, ASPECT: 0, X: -20 },
                PROPERTIES: {
                    COLOR: 'white'
                }
            }, {
                POSITION: { WIDTH: 10, HEIGHT: 5, ASPECT: 1.5, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, { reload: 2 }]),
                    TYPE: 'trplnrBossBulletHellFormPentagons',
                    COLOR: 'white'
                }
            }, {
                POSITION: { WIDTH: 8, HEIGHT: 3, X: -1, ASPECT: 1.5, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: 'pureWhite',
                }
            }, {
                POSITION: { WIDTH: 5, HEIGHT: 10, X: 5, ASPECT: 0.2, ANGLE: ((360 / 3) * i) - 180 },
                PROPERTIES: {
                    COLOR: -1,
                }
            })
        }
        output.push({
            POSITION: { WIDTH: 0, HEIGHT: 0 },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, { reload: 2 }, g.fake]),
                TYPE: 'bullet',
                IDENTIFIER: 'onHandler'
            }
        })
        return output
    })()
}
Class.trplnrBossVulnerableForm = {
    PARENT: "miniboss",
    ...trplnrBossDecor,
    LABEL: 'Lavender - Vulnerable Form',
    BODY: {
        HEALTH: 500,
        SPEED: 0.01
    },
    ON: [
        {
            event: "fire",
            handler: ({ body, gun }) => {
                if (gun.identifier != 'onHandler') return
                setTimeout(() => {
                    body.define('trplnrBoss')
                    body.sendMessage('im awake')
                }, 15000)
                setTimeout(() => body.sendMessage('Lavender will activate in 10 seconds and turn into S4nctuary F0rM'), 5000)
            }
        }
    ],
    GUNS: [{
        POSITION: {LENGTH: 0, WIDTH: 0},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 500}]),
            TYPE: 'bullet',
            AUTOFIRE: true,
            IDENTIFIER: 'onHandler'
        }
    }]
}

let testLayeredBoss = new LayeredBoss("testLayeredBoss", "Test Layered Boss", "terrestrial", 7, 3, "terrestrialTrapTurret", 5, 7, {SPEED: 10});
testLayeredBoss.addLayer({gun: {
    POSITION: [3.6, 7, -1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", {INDEPENDENT: true}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
testLayeredBoss.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "crowbarTurret",
}}, true);
