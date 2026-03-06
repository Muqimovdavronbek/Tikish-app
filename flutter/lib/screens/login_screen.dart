// lib/screens/login_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _phoneCtrl = TextEditingController();
  final _passCtrl  = TextEditingController();
  bool _obscure   = true;
  bool _loading   = false;
  String _role    = 'customer'; // 'customer' | 'tailor'

  @override
  void dispose() {
    _phoneCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 1200));
    if (!mounted) return;
    setState(() => _loading = false);
    if (_role == 'tailor') {
      context.go('/tailor-dashboard');
    } else {
      context.go('/home');
    }
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
                const SizedBox(height: 32),
                // Logo row
                Row(children: [
                  Container(
                    width: 42, height: 42,
                    decoration: BoxDecoration(
                      color: const Color(0xFFfdf0f5),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.content_cut, color: kPrimary, size: 22),
                  ),
                  const SizedBox(width: 10),
                  RichText(text: TextSpan(
                    style: GoogleFonts.playfairDisplay(fontSize: 22, fontWeight: FontWeight.w700, color: kDark),
                    children: const [
                      TextSpan(text: 'TIKISH'),
                      TextSpan(text: '.UZ', style: TextStyle(color: kPrimary)),
                    ],
                  )),
                ]),
                const SizedBox(height: 32),
                Text("Kirish", style: GoogleFonts.playfairDisplay(fontSize: 28, fontWeight: FontWeight.w700, color: kDark)),
                const SizedBox(height: 6),
                Text("Hisobingizga kiring yoki yangi hisob oching",
                  style: GoogleFonts.inter(fontSize: 13, color: kMuted)),
                const SizedBox(height: 28),

                // Role selector
                Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFfdf0f5),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  padding: const EdgeInsets.all(4),
                  child: Row(children: [
                    _RoleTab(label: "Mijoz", icon: Icons.person_outline, active: _role == 'customer',
                      onTap: () => setState(() => _role = 'customer')),
                    _RoleTab(label: "Tikuvchi", icon: Icons.content_cut, active: _role == 'tailor',
                      onTap: () => setState(() => _role = 'tailor')),
                  ]),
                ),
                const SizedBox(height: 20),

                // Phone
                Text("Telefon raqami", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: kDark)),
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
                const SizedBox(height: 16),

                // Password
                Text("Parol", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: kDark)),
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
                const SizedBox(height: 10),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text("Parolni unutdingizmi?",
                      style: GoogleFonts.inter(fontSize: 12, color: kPrimary, fontWeight: FontWeight.w600)),
                  ),
                ),
                const SizedBox(height: 8),

                // Login button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _loading ? null : _login,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimary,
                      shadowColor: kPrimary.withOpacity(0.35),
                      elevation: _loading ? 0 : 4,
                    ),
                    child: _loading
                      ? const SizedBox(width: 20, height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text("Kirish", style: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 15)),
                  ),
                ),
                const SizedBox(height: 20),

                // Register link
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Text("Hisobingiz yo'qmi? ",
                    style: GoogleFonts.inter(fontSize: 13, color: kMuted)),
                  GestureDetector(
                    onTap: () => context.go('/register'),
                    child: Text("Ro'yxatdan o'ting",
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

class _RoleTab extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool active;
  final VoidCallback onTap;
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
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 16, color: active ? Colors.white : kMuted),
              const SizedBox(width: 6),
              Text(label, style: GoogleFonts.inter(
                fontSize: 13, fontWeight: FontWeight.w600,
                color: active ? Colors.white : kMuted)),
            ],
          ),
        ),
      ),
    );
  }
}
