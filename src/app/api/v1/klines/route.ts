import { NextRequest, NextResponse } from "next/server";

interface KlineData {
  openTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
}

async function fetchKlineData(symbol: string, interval: string, startTime?: string, endTime?: string): Promise<KlineData[]> {
  try {
    const url = `https://www.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}${startTime ? `&startTime=${startTime}` : ''}${endTime ? `&endTime=${endTime}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    const convertedData: KlineData[] = data.map((entry: any) => ({
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
    }));

    return convertedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Kline data");
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  try {
    if (!symbol || !interval) {
      throw new Error("Symbol and interval are required parameters.");
    }

    const data = await fetchKlineData(symbol, interval, startTime !== null ? startTime : undefined, endTime !== null ? endTime : undefined);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);

    return new NextResponse(JSON.stringify({ "msg": "Failed to fetch Kline data" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
