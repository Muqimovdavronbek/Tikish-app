// lib/screens/register_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl  = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _passCtrl  = TextEditingController();
  bool _obscure  = true;
  bool _loading  = false;
  String _role   = 'customer';

  @override
  void dispose() {
    _nameCtrl.dispose(); _phoneCtrl.dispose(); _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 1200));
    if (!mounted) return;
    setState(() => _loading = false);
    context.go(_role == 'tailor' ? '/tailor-dashboard' : '/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 20),
                Row(children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: kDark),
                    onPressed: () => context.go('/login'),
                  ),
                  Text("Orqaga", style: GoogleFonts.inter(fontSize: 14, color: kDark)),
                ]),
                const SizedBox(height: 16),
                Text("Ro'yxatdan o'tish",
                  style: GoogleFonts.playfairDisplay(fontSize: 26, fontWeight: FontWeight.w700, color: kDark)),
                const SizedBox(height: 6),
                Text("Yangi hisob yarating",
                  style: GoogleFonts.inter(fontSize: 13, color: kMuted)),
                const SizedBox(height: 24),

                // Role selector
                Container(
                  decoration: BoxDecoration(color: const Color(0xFFfdf0f5), borderRadius: BorderRadius.circular(14)),
                  padding: const EdgeInsets.all(4),
                  child: Row(children: [
                    _RoleTab(label: "Mijoz", icon: Icons.person_outline, active: _role == 'customer',
                      onTap: () => setState(() => _role = 'customer')),
                    _RoleTab(label: "Tikuvchi", icon: Icons.content_cut, active: _role == 'tailor',
                      onTap: () => setState(() => _role = 'tailor')),
                  ]),
                ),
                const SizedBox(height: 20),

                _FieldLabel("Ism va familiya"),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _nameCtrl,
                  style: GoogleFonts.inter(fontSize: 14, color: kDark),
                  decoration: const InputDecoration(
                    hintText: "Madina Umarova",
                    prefixIcon: Icon(Icons.person_outline, color: kPrimary, size: 20),
                  ),
                  validator: (v) => (v == null || v.isEmpty) ? 'Ismingizni kiriting' : null,
                ),
                const SizedBox(height: 14),
                _FieldLabel("Telefon raqami"),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _phoneCtrl,
                  keyboardType: TextInputType.phone,
                  style: GoogleFonts.inter(fontSize: 14, color: kDark),
                  decoration: const InputDecoration(
                    hintText: "+998 90 123 45 67",
                    prefixIcon: Icon(Icons.phone_outlined, color: kPrimary, size: 20),
                  ),
                  validator: (v) => (v == null || v.isEmpty) ? 'Telefon raqamini kiriting' : null,
                ),
                const SizedBox(height: 14),
                _FieldLabel("Parol"),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _passCtrl,
                  obscureText: _obscure,
                  style: GoogleFonts.inter(fontSize: 14, color: kDark),
                  decoration: InputDecoration(
                    hintText: "••••••••",
                    prefixIcon: const Icon(Icons.lock_outline, color: kPrimary, size: 20),
                    suffixIcon: IconButton(
                      icon: Icon(_obscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                        color: kMuted, size: 20),
                      onPressed: () => setState(() => _obscure = !_obscure),
                    ),
                  ),
                  validator: (v) => (v == null || v.length < 6) ? 'Kamida 6 ta belgi' : null,
                ),
                const SizedBox(height: 24),

                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _loading ? null : _register,
                    child: _loading
                      ? const SizedBox(width: 20, height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Text("Ro'yxatdan o'tish"),
                  ),
                ),
                const SizedBox(height: 20),
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Text("Hisobingiz bormi? ",
                    style: GoogleFonts.inter(fontSize: 13, color: kMuted)),
                  GestureDetector(
                    onTap: () => context.go('/login'),
                    child: Text("Kirish",
                      style: GoogleFonts.inter(fontSize: 13, color: kPrimary, fontWeight: FontWeight.w600)),
                  ),
                ]),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);
  @override
  Widget build(BuildContext context) =>
    Text(text, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: kDark));
}

class _RoleTab extends StatelessWidget {
  final String label; final IconData icon; final bool active; final VoidCallback onTap;
  const _RoleTab({required this.label, required this.icon, required this.active, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: active ? kPrimary : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Icon(icon, size: 16, color: active ? Colors.white : kMuted),
            const SizedBox(width: 6),
            Text(label, style: GoogleFonts.inter(
              fontSize: 13, fontWeight: FontWeight.w600,
              color: active ? Colors.white : kMuted)),
          ]),
        ),
      ),
    );
  }
}
