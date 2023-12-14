from flask import Flask, request
import asyncio
import websockets
import json
import aiohttp


app = Flask(__name__)


@app.route('/start', methods=['POST'])
def start_transcription():
    asyncio.run(main())
    return 'Transcription started.'


@app.route('/live', methods=['GET'])
def receive_live_responses():
    return app.response_class(
        response=live_response_generator(),
        status=200,
        mimetype='text/plain'
    )


async def main():
    # Your Deepgram API Key
    DEEPGRAM_API_KEY = 'YOUR_DEEPGRAM_API_KEY'

    # URL for the realtime streaming audio you would like to transcribe
    URL = 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service'

    # Initialize the Deepgram SDK
    async with websockets.connect('wss://api.deepgram.com/v1/listen') as websocket:
        # Send the authentication message with the API key
        auth_message = json.dumps({'token': DEEPGRAM_API_KEY})
        await websocket.send(auth_message)

        # Receive and handle the authentication response
        auth_response = await websocket.recv()
        print(auth_response)

        # Send the start message to initiate the transcription
        start_message = json.dumps({'action': 'start'})
        await websocket.send(start_message)

        # Send the audio data in chunks from the URL
        async with aiohttp.ClientSession() as session:
            async with session.get(URL) as audio:
                while True:
                    data = await audio.content.readany()

                    if not data:
                        break

                    await websocket.send(data)


async def live_response_generator():
    # Connect to the Deepgram WebSocket API
    async with websockets.connect('wss://api.deepgram.com/v1/listen') as websocket:
        # Send the authentication message with the API key
        auth_message = json.dumps({'token': DEEPGRAM_API_KEY})
        await websocket.send(auth_message)

        # Receive and handle the authentication response
        auth_response = await websocket.recv()
        print(auth_response)

        # Send the start message to initiate the transcription
        start_message = json.dumps({'action': 'start'})
        await websocket.send(start_message)

        # Continuously receive and yield live responses
        while True:
            response = await websocket.recv()
            yield response


if __name__ == '__main__':
    app.run()
