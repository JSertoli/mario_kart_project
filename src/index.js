const player1 = {
    nome: "Mario",
    velocidade: 5,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    nome: "Luigi",
    velocidade: 5,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function playRace(player1, player2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁Rodada ${round} \n --------------------------`);


        let block = await getRandomBlock();
        let iconType = block === "RETA" ? "🛣️" : block === "CURVA" ? "🔄" : "🥊";
        console.log(`Bloco sorteado: ${block} ${iconType}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + player1.velocidade;
            totalTestSkill2 = diceResult2 + player2.velocidade;

            await logRollResult(player1.nome, "velocidade", diceResult1, totalTestSkill1);
            await logRollResult(player2.nome, "velocidade", diceResult2, totalTestSkill2);
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + player1.manobrabilidade;
            totalTestSkill2 = diceResult2 + player2.manobrabilidade;

            await logRollResult(player1.manobrabilidade, "manobrabilidade", diceResult1, totalTestSkill1);
            await logRollResult(player2.manobrabilidade, "manobrabilidade", diceResult2, totalTestSkill2);
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + player1.poder;
            let powerResult2 = diceResult2 + player2.poder;

            console.log(` ${player1.nome} confrontou com ${player2.nome}! 🥊`);

            await logRollResult(player1.poder, "poder", diceResult1, totalTestSkill1);
            await logRollResult(player2.poder, "poder", diceResult2, totalTestSkill2);

            if (powerResult1 > powerResult2) {
                if (player2.pontos > 0) {
                    console.log(`${player1.nome} venceu o confronto! ${player2.nome} marcou um ponto! 🐢`);
                    player2.pontos--;
                }
            }

            if (powerResult1 < powerResult2) {
                if (player1.pontos > 0) {
                    console.log(`${player2.nome} venceu o confronto! ${player1.nome} marcou um ponto! 🐢`);
                    player1.pontos--;
                }
            }

            if (powerResult1 === powerResult2) {
                console.log("Empate! Ninguém marcou ponto!");
            }
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${player1.nome} marcou um ponto!`);
            player1.pontos++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${player2.nome} marcou um ponto!`);
            player2.pontos++;
        }
    }

}

async function logRollResult(playerName, block, diceResult, attribute) {
    console.log(` ${playerName} 🎲 rolou um dado de ${block} e obteve ${diceResult}`);
    console.log(`${diceResult} + ${attribute} = ${diceResult + attribute}`);

}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function declareWinner(player1, player2) {
    console.log(`🏆 Resultado final: ${player1.nome} ${player1.pontos} x ${player2.pontos} ${player2.nome}`);

    if (player1.pontos > player2.pontos) {
        console.log(`🥇 ${player1.nome} venceu a corrida! 🎉`);
    } else if (player1.pontos < player2.pontos) {
        console.log(`🥇 ${player2.nome} venceu a corrida! 🎉`);
    } else {
        console.log("Empate! 🤷‍♂️");
    }

}

(async function main() {
    console.log(`🚨Corrida entre ${player1.nome} e ${player2.nome} começando... \n`);

    await playRace(player1, player2);
    await declareWinner(player1, player2);
})();