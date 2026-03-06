// lib/screens/order_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class OrderScreen extends StatefulWidget {
  const OrderScreen({super.key});
  @override
  State<OrderScreen> createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  final _formKey = GlobalKey<FormState>();
  String _serviceType = "Ko'ylak tikish";
  String _size = 'M';
  final _notesCtrl    = TextEditingController();
  final _budgetCtrl   = TextEditingController();
  DateTime? _deadline;
  bool _loading = false;

  final _services = ["Ko'ylak tikish", "Kostyum tikish", "Milliy kiyim", "Kiyim ta'mirlash", "Boshqa"];
  final _sizes    = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  @override
  void dispose() { _notesCtrl.dispose(); _budgetCtrl.dispose(); super.dispose(); }

  Future<void> _pickDate() async {
    final d = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 5)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 90)),
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(
          colorScheme: ColorScheme.light(primary: kPrimary),
        ),
        child: child!,
      ),
    );
    if (d != null) setState(() => _deadline = d);
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 1500));
    if (!mounted) return;
    setState(() => _loading = false);
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 64, height: 64,
            decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFFd1fae5)),
            child: const Icon(Icons.check, size: 32, color: Color(0xFF065f46)),
          ),
          const SizedBox(height: 16),
          Text("Buyurtma yuborildi!", style: GoogleFonts.playfairDisplay(
            fontSize: 20, fontWeight: FontWeight.w700, color: kDark)),
          const SizedBox(height: 8),
          Text("Tikuvchi tez orada javob beradi. Bildirishnomani kuting.",
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 13, color: kMuted, height: 1.5)),
        ]),
        actions: [
          ElevatedButton(
            onPressed: () { Navigator.pop(context); context.go('/home'); },
            style: ElevatedButton.styleFrom(backgroundColor: kPrimary),
            child: const Text("Bosh sahifaga qaytish"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kDark,
        leading: GestureDetector(
          onTap: () => context.go('/home'),
          child: const Icon(Icons.arrow_back_ios_new, size: 18, color: Colors.white)),
        title: Text("Buyurtma berish",
          style: GoogleFonts.playfairDisplay(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.white)),
      ),
      backgroundColor: const Color(0xFFf7f3f5),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Tailor summary
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.06), blurRadius: 8)],
              ),
              child: Row(children: [
                Container(
                  width: 50, height: 50,
                  decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(14)),
                  child: const Icon(Icons.person, size: 28, color: Colors.white)),
                const SizedBox(width: 12),
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text("Madina Umarova",
                    style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, color: kDark)),
                  Row(children: [
                    const Icon(Icons.star, size: 12, color: kPrimary),
                    Text(" 4.9 • 127 buyurtma",
                      style: GoogleFonts.inter(fontSize: 11, color: kMuted)),
                  ]),
                ]),
              ]),
            ),
            const SizedBox(height: 16),

            _SectionLabel("Xizmat turi"),
            const SizedBox(height: 8),
            Wrap(spacing: 8, runSpacing: 8, children: _services.map((s) {
              final active = s == _serviceType;
              return GestureDetector(
                onTap: () => setState(() => _serviceType = s),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 180),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: active ? kPrimary : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: active ? kPrimary : kBorder),
                  ),
                  child: Text(s, style: GoogleFonts.inter(
                    fontSize: 12, fontWeight: FontWeight.w500,
                    color: active ? Colors.white : kDark)),
                ),
              );
            }).toList()),
            const SizedBox(height: 16),

            _SectionLabel("O'lcham"),
            const SizedBox(height: 8),
            Row(children: _sizes.map((s) {
              final active = s == _size;
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: GestureDetector(
                  onTap: () => setState(() => _size = s),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 180),
                    width: 44, height: 44,
                    decoration: BoxDecoration(
                      color: active ? kPrimary : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: active ? kPrimary : kBorder),
                    ),
                    alignment: Alignment.center,
                    child: Text(s, style: GoogleFonts.inter(
                      fontSize: 12, fontWeight: FontWeight.w600,
                      color: active ? Colors.white : kDark)),
                  ),
                ),
              );
            }).toList()),
            const SizedBox(height: 16),

            _SectionLabel("Muddat"),
            const SizedBox(height: 8),
            GestureDetector(
              onTap: _pickDate,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: _deadline != null ? kPrimary : kBorder)),
                child: Row(children: [
                  Icon(Icons.calendar_today_outlined,
                    size: 18, color: _deadline != null ? kPrimary : kMuted),
                  const SizedBox(width: 10),
                  Text(
                    _deadline != null
                      ? "${_deadline!.day} ${_monthName(_deadline!.month)} ${_deadline!.year}"
                      : "Sanani tanlang",
                    style: GoogleFonts.inter(fontSize: 13,
                      color: _deadline != null ? kDark : kMuted)),
                  const Spacer(),
                  const Icon(Icons.chevron_right, size: 18, color: Color(0xFFc4b0bc)),
                ]),
              ),
            ),
            const SizedBox(height: 16),

            _SectionLabel("Taxminiy byudjet (ixtiyoriy)"),
            const SizedBox(height: 8),
            TextFormField(
              controller: _budgetCtrl,
              keyboardType: TextInputType.number,
              style: GoogleFonts.inter(fontSize: 13, color: kDark),
              decoration: const InputDecoration(
                hintText: "Masalan: 150 000 so'm",
                prefixIcon: Icon(Icons.attach_money, color: kPrimary, size: 20)),
            ),
            const SizedBox(height: 16),

            _SectionLabel("Qo'shimcha izohlar"),
            const SizedBox(height: 8),
            TextFormField(
              controller: _notesCtrl,
              maxLines: 4,
              style: GoogleFonts.inter(fontSize: 13, color: kDark),
              decoration: const InputDecoration(
                hintText: "Material, rang, uslub haqida ma'lumot bering..."),
              validator: (v) => (v == null || v.isEmpty) ? 'Izoh kiriting' : null,
            ),
            const SizedBox(height: 24),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _submit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: kPrimary,
                  shadowColor: kPrimary.withOpacity(0.35), elevation: 4),
                child: _loading
                  ? const SizedBox(width: 20, height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                  : const Text("Buyurtmani yuborish"),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  String _monthName(int m) {
    const names = ['','Yanvar','Fevral','Mart','Aprel','May','Iyun',
      'Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
    return names[m];
  }
}

class _SectionLabel extends StatelessWidget {
  final String text;
  const _SectionLabel(this.text);
  @override
  Widget build(BuildContext context) =>
    Text(text, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark));
}
