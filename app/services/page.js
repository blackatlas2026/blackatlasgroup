// components/ServicesBento.jsx
import ServicesBento from "../components/services/ServicesBento";
import Link from "next/link";

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
        <div className=" mb-16 border-l-4 border-red-500 pl-8">
            <h2 className="text-5xl md:text-6xl font-black mb-4 leading-none  tracking-tighter">
                        Real-World <br/> <span className="text-red-500 font-chamberi ">Excellence.</span>
            </h2>
            <p className="text-slate-600 max-w-xl text-lg font-medium">
                        Bridging the gap between corporate infrastructure and high-end consumer experiences through meticulous service design.
                    </p>
        </div>
        <ServicesBento/>


        <div className="w-full mx-auto px-6  mt-9 py-24 text-center bg-white rounded-4xl flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to transform your lifestyle?</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">Join over 100,000 members who enjoy premium services and exclusive benefits every day.</p>
            <Link className="inline-block bg-red-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-100 " href="/marketplace">Start Shopping Now</Link>
        </div>
    </div>
  );
}
