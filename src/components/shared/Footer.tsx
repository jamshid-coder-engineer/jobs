const Footer = () => {
  return (
    <footer className="border-t bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} JobHunter. Barcha huquqlar himoyalangan.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-600 transition-colors">Biz haqimizda</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Yordam</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Maxfiylik siyosati</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;