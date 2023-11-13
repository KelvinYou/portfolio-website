import { NextRequest, NextResponse } from "next/server";
import personalData from "./testing.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const newPersonalData = {
    ... personalData,
    id: id || "no data"
  }

	try {
		const res = await fetch(`https://www.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&startTime=1699708084000&endTime=1699880884000`);
    // https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
    const data = await res.json();
    const convertedData = data.map((entry: any) => ({
      openTime: entry[0],
      openPrice: parseFloat(entry[1]),
      highPrice: parseFloat(entry[2]),
      lowPrice: parseFloat(entry[3]),
      closePrice: parseFloat(entry[4]),
      volume: parseFloat(entry[5]),
      closeTime: entry[6],
      quoteAssetVolume: parseFloat(entry[7]),
      numberOfTrades: entry[8],
      takerBuyBaseAssetVolume: parseFloat(entry[9]),
      takerBuyQuoteAssetVolume: parseFloat(entry[10]),
      // The last field is unused and ignored
    }));
    return new NextResponse(JSON.stringify(convertedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
	} catch (err) {
		console.log(err);
	}

  return new NextResponse(JSON.stringify({newPersonalData}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}