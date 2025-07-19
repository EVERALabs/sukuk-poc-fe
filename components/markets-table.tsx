import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const marketData = [
  {
    name: "2XSqsn",
    pair: "MON",
    age: "2m",
    price: "0.049510",
    volume: "$0.0052",
    marketCap: "$0",
    liquidity: "$0.99",
    priceChange: "0%",
    txns: "1",
    ratio: "0 / 1",
  },
  {
    name: "WEST2",
    pair: "MON",
    age: "2m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "TAHIN",
    pair: "MON",
    age: "3m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "ROOTS",
    pair: "MON",
    age: "3m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "MATRI",
    pair: "MON",
    age: "3m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "9kBZotGB",
    pair: "MON",
    age: "3m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "DUSKY",
    pair: "MON",
    age: "3m",
    price: "0",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1",
    priceChange: "0%",
    txns: "0",
    ratio: "0 / 0",
  },
  {
    name: "menc",
    pair: "MON",
    age: "4m",
    price: "0.2663",
    volume: "$0",
    marketCap: "$0",
    liquidity: "$1.25",
    priceChange: "56.48%",
    txns: "1",
    ratio: "1 / 0",
  },
]

export function MarketsTable() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search markets"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-green-400"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
            </div>
            <Button variant="ghost" className="text-gray-400">
              Watchlist
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Quick buy</span>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white">Trending</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">New Pairs</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="text-left py-3 px-2">Market</th>
                <th className="text-left py-3 px-2">Age</th>
                <th className="text-left py-3 px-2">Price</th>
                <th className="text-left py-3 px-2">Volume</th>
                <th className="text-left py-3 px-2">Market Cap</th>
                <th className="text-left py-3 px-2">Liquidity</th>
                <th className="text-left py-3 px-2">Price Change</th>
                <th className="text-left py-3 px-2">Txns</th>
                <th className="text-left py-3 px-2">Audit</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((market, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-3">
                      <Star className="w-4 h-4 text-gray-500" />
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {market.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{market.name}</div>
                        <div className="text-gray-400 text-sm">/ {market.pair}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm">{market.age}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <span>{market.price}</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </td>
                  <td className="py-3 px-2">{market.volume}</td>
                  <td className="py-3 px-2">{market.marketCap}</td>
                  <td className="py-3 px-2">{market.liquidity}</td>
                  <td className="py-3 px-2">
                    <span
                      className={
                        market.priceChange.includes("-")
                          ? "text-red-400"
                          : market.priceChange === "0%"
                            ? "text-gray-400"
                            : "text-green-400"
                      }
                    >
                      {market.priceChange}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-center">
                      <div className="text-sm">{market.txns}</div>
                      <div className="text-xs text-green-400">{market.ratio}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
