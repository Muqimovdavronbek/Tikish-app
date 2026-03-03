// lib/screens/tailor_dashboard_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class _Order {
  final String id, client, service, size, deadline, budget;
  String status; // mutable
  _Order({required this.id, required this.client, required this.service,
    required this.size, required this.deadline, required this.budget, required this.status});
}

class TailorDashboardScreen extends StatefulWidget {
  const TailorDashboardScreen({super.key});
  @override
  State<TailorDashboardScreen> createState() => _TailorDashboardScreenState();
}

class _TailorDashboardScreenState extends State<TailorDashboardScreen> {
  final List<_Order> _orders = [
    _Order(id:'TK-2051', client:"Zulfiya M.",  service:"Ko'ylak tikish",  size:"S", deadline:"20 Mart", budget:"120 000", status:"Yangi"),
    _Order(id:'TK-2049', client:"Jasur K.",    service:"Kostyum tikish",  size:"L", deadline:"18 Mart", budget:"280 000", status:"Ko'rib chiqilmoqda"),
    _Order(id:'TK-2047', client:"Nafisa B.",   service:"Milliy Chapan",   size:"M", deadline:"25 Mart", budget:"200 000", status:"Jarayonda"),
  ];

  void _acceptOrder(String id) {
    setState(() {
      final o = _orders.firstWhere((x) => x.id == id);
      o.status = o.status == "Yangi" ? "Ko'rib chiqilmoqda" : "Jarayonda";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf7f3f5),
      body: CustomScrollView(slivers: [
        // Header
        SliverToBoxAdapter(
          child: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft, end: Alignment.bottomRight,
                colors: [kDark, Color(0xFF2e1a2e)],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(18, 12, 18, 18),
                child: Column(children: [
                  // Back row
                  Row(children: [
                    GestureDetector(
                      onTap: () => context.go('/home'),
                      child: Container(
                        width: 36, height: 36,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white.withOpacity(0.1)),
                        child: const Icon(Icons.arrow_back_ios_new, size: 16, color: Colors.white),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text("TIKUVCHI PANELI",
                        style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w700,
                          letterSpacing: 2, color: kPrimary)),
                      Text("Madina Umarova",
                        style: GoogleFonts.playfairDisplay(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white)),
                    ]),
                    const Spacer(),
                    Row(children: [
                      Container(width: 8, height: 8,
                        decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF4ade80))),
                      const SizedBox(width: 5),
                      Text("Aktiv", style: GoogleFonts.inter(fontSize: 11, color: Colors.white54)),
                    ]),
                  ]),
                  const SizedBox(height: 16),

                  // KPI grid
                  GridView.count(
                    shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: 2, mainAxisSpacing: 8, crossAxisSpacing: 8,
                    childAspectRatio: 2.4,
                    children: [
                      _KpiCard(label: "Oylik daromad", value: "2 450 000",  unit: "so'm",  icon: Icons.trending_up,    color: const Color(0xFF34d399)),
                      _KpiCard(label: "Jami buyurtma", value: "127",        unit: "ta",    icon: Icons.inventory_2_outlined, color: kPrimary),
                      _KpiCard(label: "Doimiy mijoz",  value: "38",         unit: "ta",    icon: Icons.people_outline,  color: const Color(0xFF60a5fa)),
                      _KpiCard(label: "O'rtacha bal",  value: "4.9",        unit: "★",     icon: Icons.star_outline,    color: const Color(0xFFfbbf24)),
                    ],
                  ),
                ]),
              ),
            ),
          ),
        ),

        // Orders
        SliverPadding(
          padding: const EdgeInsets.all(14),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              // Header
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Row(children: [
                  Text("Yangi buyurtmalar",
                    style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, color: kDark)),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFfdf0f5),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      "${_orders.where((o) => o.status == 'Yangi').length} yangi",
                      style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w700, color: kPrimary)),
                  ),
                ]),
              ),

              // Order cards
              ..._orders.map((o) => _OrderCard(
                order: o,
                onAccept: () => _acceptOrder(o.id),
                onChat: () => context.go('/chat'),
              )),
            ]),
          ),
        ),
      ]),
    );
  }
}

class _KpiCard extends StatelessWidget {
  final String label, value, unit; final IconData icon; final Color color;
  const _KpiCard({required this.label, required this.value,
    required this.unit, required this.icon, required this.color});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.07),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Row(children: [
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(label, style: GoogleFonts.inter(fontSize: 9, color: Colors.white38), maxLines: 1),
          const SizedBox(height: 4),
          RichText(text: TextSpan(
            style: GoogleFonts.playfairDisplay(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.white),
            children: [
              TextSpan(text: value),
              TextSpan(text: " $unit", style: GoogleFonts.inter(fontSize: 9, color: Colors.white38)),
            ],
          )),
        ])),
        Icon(icon, size: 16, color: color),
      ]),
    );
  }
}

class _StatusBadge {
  final Color bg, text, border;
  const _StatusBadge({required this.bg, required this.text, required this.border});
}

const _statusColors = <String, _StatusBadge>{
  "Yangi":              _StatusBadge(bg: Color(0xFFfdf0f5), text: kPrimary,               border: Color(0xFFf9c8da)),
  "Ko'rib chiqilmoqda": _StatusBadge(bg: Color(0xFFfef9c3), text: Color(0xFF92400e),       border: Color(0xFFfde68a)),
  "Jarayonda":          _StatusBadge(bg: Color(0xFFd1fae5), text: Color(0xFF065f46),        border: Color(0xFF6ee7b7)),
};

class _OrderCard extends StatelessWidget {
  final _Order order;
  final VoidCallback onAccept, onChat;
  const _OrderCard({required this.order, required this.onAccept, required this.onChat});

  @override
  Widget build(BuildContext context) {
    final sc = _statusColors[order.status] ??
      const _StatusBadge(bg: Color(0xFFf3f4f6), text: Color(0xFF374151), border: Color(0xFFe5e7eb));

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.07), blurRadius: 14, offset: const Offset(0, 4))],
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(children: [
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
              width: 48, height: 48,
              decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(14)),
              child: const Icon(Icons.checkroom, size: 26, color: Colors.grey),
            ),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(order.service,
                  style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark))),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(
                    color: sc.bg, borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: sc.border)),
                  child: Text(order.status, style: GoogleFonts.inter(
                    fontSize: 10, fontWeight: FontWeight.w700, color: sc.text)),
                ),
              ]),
              const SizedBox(height: 3),
              RichText(text: TextSpan(
                style: GoogleFonts.inter(fontSize: 11, color: kMuted),
                children: [
                  const TextSpan(text: "Mijoz: "),
                  TextSpan(text: order.client,
                    style: const TextStyle(fontWeight: FontWeight.w700, color: kDark)),
                ],
              )),
              const SizedBox(height: 6),
              Row(children: [
                const Icon(Icons.straighten, size: 11, color: Color(0xFFc4b0bc)),
                const SizedBox(width: 3),
                Text("O'lcham: ${order.size}", style: GoogleFonts.inter(fontSize: 10, color: kMuted)),
                const SizedBox(width: 10),
                const Icon(Icons.access_time, size: 11, color: Color(0xFFc4b0bc)),
                const SizedBox(width: 3),
                Text(order.deadline, style: GoogleFonts.inter(fontSize: 10, color: kMuted)),
                const Spacer(),
                Text("${order.budget} so'm",
                  style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w700, color: kPrimary)),
              ]),
            ])),
          ]),
          const SizedBox(height: 12),

          // Action buttons
          Row(children: [
            Expanded(
              child: GestureDetector(
                onTap: onChat,
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  decoration: BoxDecoration(
                    color: const Color(0xFFfdf0f5),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: kPrimary.withOpacity(0.3)),
                  ),
                  child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    const Icon(Icons.message_outlined, size: 14, color: kPrimary),
                    const SizedBox(width: 6),
                    Text("Muloqot", style: GoogleFonts.inter(
                      fontSize: 12, fontWeight: FontWeight.w600, color: kPrimary)),
                  ]),
                ),
              ),
            ),
            const SizedBox(width: 8),
            if (order.status != "Jarayonda")
              Expanded(
                child: GestureDetector(
                  onTap: onAccept,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: order.status == "Ko'rib chiqilmoqda"
                        ? const Color(0xFF065f46) : kPrimary,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 3))],
                    ),
                    child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                      const Icon(Icons.check_circle_outline, size: 14, color: Colors.white),
                      const SizedBox(width: 6),
                      Text(order.status == "Ko'rib chiqilmoqda" ? "Boshlash" : "Qabul qilish",
                        style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white)),
                    ]),
                  ),
                ),
              )
            else
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  decoration: BoxDecoration(
                    color: const Color(0xFFd1fae5),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    const Icon(Icons.check_circle_outline, size: 14, color: Color(0xFF065f46)),
                    const SizedBox(width: 6),
                    Text("Jarayonda", style: GoogleFonts.inter(
                      fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF065f46))),
                  ]),
                ),
              ),
          ]),
        ]),
      ),
    );
  }
}
