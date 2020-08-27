function oneMore() {
    console.log("one more");
}

function run() {
    console.log("run run");
    setTimeout(() => {
        console.log("wow");
    }, 0)
    new Promise((resolve) => {
        resolve("hi");
    })
        .then(console.log);
    oneMore();    
}

setTimeout(run, 5000);

// 실행 결과
// run run
// one more
// hi
// wow

// promise의 then이 setTimeout보다 우선순위가 높기 때문에 hi가 먼저 실행