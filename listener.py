import asyncio
import base64
import websockets

async def run(items):
    for i in range(1, len(items)):
        if len(items) == 1:
            print("break")
            break
        x = base64.b64decode(items[i]).decode('utf-8')
        y = base64.b64decode(x.split(" ")[0].encode('utf-8')).decode('utf-8')
        print(y, end=" ")
        print(' '.join(x.split(" ")[1:]))

async def handler(websocket):
    while True:
        message = await websocket.recv()
        if message[0:2] in ["I:"]:
            message = message[2:]
            msg = base64.b64decode(message).decode('utf-8')
            print(msg)
        elif message[0:2] == "A:":
            msg = base64.b64decode(message[2:]).decode('utf-8')
            messages = msg.split(",")
            await run(messages)
        elif message[0:2] == "M:":
            message = message[2:]
            msg = base64.b64decode(message).decode('utf-8')
            msg2 = msg.split(" ")[0]
            print(' '.join(msg.split(" ")[1:]))
            print(base64.b64decode(msg2.encode('utf-8')).decode('utf-8'))
async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
