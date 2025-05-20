async function main() {
	const program = new Program();

	try {
		await program.createUser("奥原駿太");
		console.log("ユーザーが正常に作成されました");
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("エラーが発生しました:", error.message);
		} else {
			console.error("予期せぬエラーが発生しました");
		}
	}
}

main();
