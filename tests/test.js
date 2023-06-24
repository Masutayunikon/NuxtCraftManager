async function readme() {
    const PgBoss = require('pg-boss');
    const boss = new PgBoss(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

    boss.on('error', error => console.error(error));

    await boss.start();

    const queue = 'some-queue';

    let jobId = await boss.send(queue, { param1: 'foo' })

    console.log(`created job in queue ${queue}: ${jobId}`);

    await boss.work(queue, someAsyncJobHandler);

    await boss.stop();
}

async function someAsyncJobHandler(job) {
    console.log(`job ${job.id} received with data:`);
    console.log(JSON.stringify(job.data));

    async function doSomethingAsyncWithThis(data) {
        // sleep for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(`job ${job.id} completed`);
    }

    await doSomethingAsyncWithThis(job.data);
}

readme();
